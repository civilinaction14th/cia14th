import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

type CompetitionType = "FCEC" | "ITC" | "SBC" | "CIC";

interface RegistrationData {
  competition: CompetitionType;
  userId: string;
  createdAt: string;
  [key: string]: any;
}

/**
 * Headers untuk FCEC
 */
const FCEC_HEADERS = [
  "Timestamp",
  "User ID",
  "Competition",
  "Nama Tim",
  "Asal Sekolah",
  "Nama Ketua",
  "Email Ketua",
  "No WhatsApp & Line",
  "Nama Anggota 1",
  "Nama Anggota 2",
  "Judul Abstrak",
  "Subtema",
  "Kartu Identitas",
  "Pas Foto",
  "Surat Orisinalitas",
  "Surat Siswa Aktif",
  "Twibbon",
  "Pembayaran",
  "File Abstrak",
];

/**
 * Headers untuk General (ITC, SBC, CIC)
 */
const GENERAL_HEADERS = [
  "Timestamp",
  "User ID",
  "Competition",
  "Nama Tim",
  "Nama Ketua",
  "Email Ketua",
  "Nama Dosen",
  "NIP Dosen",
  "Telepon Dosen",
  "Email Dosen",
  "Biodata Tim",
  "KTM",
  "Twibbon",
  "Follow Instagram",
  "Pembayaran",
];

async function initializeSheetTab(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: CompetitionType,
) {
  try {
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheetExists = spreadsheet.data.sheets?.some(
      (sheet) => sheet.properties?.title === tabName,
    );

    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: tabName,
                },
              },
            },
          ],
        },
      });
    }

    const headers = tabName === "FCEC" ? FCEC_HEADERS : GENERAL_HEADERS;
    const range = `${tabName}!A1:${String.fromCharCode(64 + headers.length)}1`;

    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    if (!existingData.data.values || existingData.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: {
          values: [headers],
        },
      });
    }
  } catch (error) {
    console.error(`Error initializing sheet tab ${tabName}:`, error);
    throw error;
  }
}

/**
 * Format data FCEC untuk row di Sheets
 * Sesuai dengan FCECLombaForm.tsx fields
 */
function formatFCECData(data: RegistrationData): string[] {
  const docs = data.documents || {};
  return [
    data.createdAt || new Date().toISOString(),
    data.userId || "",
    data.competition || "",
    data.namaTim || "",
    data.asalSekolah || "",
    data.namaKetua || "",
    data.emailKetua || "",
    data.nomorWhatsApp || "",
    data.namaAnggota1 || "",
    data.namaAnggota2 || "",
    data.judulAbstrak || "",
    data.subtema || "",
    docs.ktpFile || "",
    docs.pasFotoFile || "",
    docs.orisinalitasFile || "",
    docs.siswaAktifFile || "",
    docs.twibbonFile || "",
    docs.pembayaranFile || "",
    docs.abstrakFile || "",
  ];
}

/**
 * Format data General (ITC, SBC, CIC) untuk row di Sheets
 * Sesuai dengan GeneralLombaForm.tsx fields
 */
function formatGeneralData(data: RegistrationData): string[] {
  const docs = data.documents || {};
  return [
    data.createdAt || new Date().toISOString(),
    data.userId || "",
    data.competition || "",
    data.namaTim || "",
    data.namaKetua || "",
    data.emailKetua || "",
    data.dosenNama || "",
    data.dosenNip || "",
    data.dosenTelepon || "",
    data.dosenEmail || "",
    docs.biodataFile || "",
    docs.ktmFile || "",
    docs.twibbonFile || "",
    docs.instagramFile || "",
    docs.pembayaranFile || "",
  ];
}

function formatDataToRow(data: RegistrationData): string[] {
  if (data.competition === "FCEC") {
    return formatFCECData(data);
  }
  return formatGeneralData(data);
}

async function appendRowToSheet(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: CompetitionType,
  rowData: string[],
) {
  const range = `${tabName}!A:Z`;
  
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: {
      values: [rowData],
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const data: RegistrationData = await request.json();

    if (!data.competition || !data.userId) {
      return NextResponse.json(
        { error: "Competition dan userId wajib disertakan" },
        { status: 400 },
      );
    }

    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!serviceAccountEmail || !privateKey || !spreadsheetId) {
      return NextResponse.json(
        { error: "Konfigurasi Google Sheets belum lengkap" },
        { status: 500 },
      );
    }

    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await initializeSheetTab(sheets, spreadsheetId, data.competition);

    const rowData = formatDataToRow(data);

    await appendRowToSheet(sheets, spreadsheetId, data.competition, rowData);

    return NextResponse.json({
      success: true,
      message: "Data berhasil disimpan ke Google Sheets",
    });
  } catch (error: any) {
    console.error("Google Sheets write error:", error);
    
    let errorMessage = "Gagal menyimpan data ke Google Sheets";
    if (error.code === 403) {
      errorMessage = "Akses ditolak. Periksa permission Service Account";
    } else if (error.code === 404) {
      errorMessage = "Spreadsheet tidak ditemukan. Periksa SPREADSHEET_ID";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
