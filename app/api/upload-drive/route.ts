import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

async function getOrCreateSubfolder(
  drive: ReturnType<typeof google.drive>,
  parentFolderId: string,
  subfolderPath: string
): Promise<string> {
  let currentParentId = parentFolderId;
  const paths = subfolderPath.split("/").filter(Boolean);

  for (const folderName of paths) {
    const existing = await drive.files.list({
      q: `name='${folderName}' and '${currentParentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      fields: "files(id)",
    });

    if (existing.data.files && existing.data.files.length > 0) {
      currentParentId = existing.data.files[0].id!;
    } else {
      const created = await drive.files.create({
        supportsAllDrives: true,
        requestBody: {
          name: folderName,
          mimeType: "application/vnd.google-apps.folder",
          parents: [currentParentId],
        },
        fields: "id",
      });
      currentParentId = created.data.id!;
    }
  }

  return currentParentId;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const fileName = formData.get("fileName") as string | null;
    const subfolderName = formData.get("subfolderName") as string | null;

    if (!file || !fileName) {
      return NextResponse.json(
        { error: "File dan nama file wajib disertakan" },
        { status: 400 }
      );
    }

    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!serviceAccountEmail || !privateKey || !folderId) {
      return NextResponse.json(
        { error: "Konfigurasi Google Drive belum lengkap" },
        { status: 500 }
      );
    }

    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });

    const targetFolderId = subfolderName
      ? await getOrCreateSubfolder(drive, folderId, subfolderName)
      : folderId;

    const buffer = Buffer.from(await file.arrayBuffer());
    const { Readable } = await import("stream");
    const stream = Readable.from(buffer);

    const uploadResponse = await drive.files.create({
      supportsAllDrives: true,
      requestBody: {
        name: fileName,
        mimeType: "application/pdf",
        parents: [targetFolderId],
      },
      media: {
        mimeType: "application/pdf",
        body: stream,
      },
      fields: "id, webViewLink",
    });

    const fileId = uploadResponse.data.id;
    const fileUrl = uploadResponse.data.webViewLink;

    await drive.permissions.create({
      fileId: fileId!,
      supportsAllDrives: true,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return NextResponse.json({ fileId, fileUrl });
  } catch (error) {
    console.error("Google Drive upload error:", error);
    return NextResponse.json(
      { error: "Gagal mengupload file ke Google Drive" },
      { status: 500 }
    );
  }
}
