// Centralized event data — single source of truth untuk tanggal & info lomba

export type EventWave = {
  label: string;
  startDate: Date;
  endDate: Date;
};

export type EventData = {
  id: string;
  name: string;
  color: string;
  loName?: string;
  loPhone?: string;
  waves: EventWave[];
};

export const events: EventData[] = [
  {
    id: "cic",
    name: "CIC",
    color: "#F0B040",
    loName: "LO CIC",
    loPhone: "6281234567890",
    waves: [
      {
        label: "Gelombang 1",
        startDate: new Date("2026-03-27"),
        endDate: new Date("2026-04-27"),
      },
      {
        label: "Gelombang 2",
        startDate: new Date("2026-04-28"),
        endDate: new Date("2026-05-10"),
      },
      {
        label: "Gelombang 3",
        startDate: new Date("2026-05-11"),
        endDate: new Date("2026-05-17"),
      },
    ],
  },
  {
    id: "sbc",
    name: "SBC",
    color: "#E05020",
    loName: "LO SBC",
    loPhone: "6282345678901",
    waves: [
      {
        label: "Dibuka",
        startDate: new Date("2026-03-27"),
        endDate: new Date("2026-05-02"),
      },
      // {
      //   label: "Diperpanjang",
      //   startDate: new Date("2026-05-03"),
      //   endDate: new Date("2026-05-17"),
      // },
      {
        label: "Gelombang 2",
        startDate: new Date("2026-05-04"),
        endDate: new Date("2026-05-10"),
      }
    ],
  },
  {
    id: "fcec",
    name: "FCEC",
    color: "#0070B0",
    loName: "LO FCEC",
    loPhone: "6283456789012",
    waves: [
      {
        label: "Dibuka",
        startDate: new Date("2026-03-27"),
        endDate: new Date("2026-05-10"),
      },
      {
        label: "Diperpanjang",
        startDate: new Date("2026-05-11"),
        endDate: new Date("2026-05-17"),
      },
    ],
  },
  {
    id: "itc",
    name: "ITC",
    color: "#00A86B",
    loName: "LO ITC",
    loPhone: "6284567890123",
    waves: [
      {
        label: "Gelombang 1",
        startDate: new Date("2026-03-27"),
        endDate: new Date("2026-04-27"),
      },
      {
        label: "Gelombang 2",
        startDate: new Date("2026-04-28"),
        endDate: new Date("2026-05-10"),
      },
      {
        label: "Gelombang 3",
        startDate: new Date("2026-05-11"),
        endDate: new Date("2026-05-17"),
      },
    ],
  },
];

// Helper: format Date -> "27 Maret 2026"
const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function getCurrentDate(): Date {
  const isProd = process.env.NEXT_PUBLIC_PRODUCTION;


  // Bypass khusus masa testing (Production = False) -> Paksa mesin waktu ke 2 April 2026
  // (Tanggal 2 April dipastikan masuk range Gelombang 1 & "Dibuka" buat semua Lomba)
  if (String(isProd).trim() === "false") {
    return new Date("2026-04-02T12:00:00Z");
  }
  return new Date();
}

// Helper: cek apakah pendaftaran seluruh event telah ditutup 
// (untuk memblokir pembuatan akun baru di halaman register)
export function isGlobalRegistrationClosed(now: Date = getCurrentDate()): boolean {
  return events.every((event) => {
    const lastClose = getLastCloseDate(event);
    const lastCloseEnd = new Date(lastClose);
    lastCloseEnd.setHours(23, 59, 59, 999);
    return now > lastCloseEnd;
  });
}

export function formatDate(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

// Helper: cek apakah gelombang aktif sekarang
export function getActiveWave(
  event: EventData,
  now: Date = getCurrentDate(),
): EventWave | null {
  for (const wave of event.waves) {
    // endDate sampai akhir hari
    const end = new Date(wave.endDate);
    end.setHours(23, 59, 59, 999);

    if (now >= wave.startDate && now <= end) {
      return wave;
    }
  }
  return null;
}

// Helper: cek apakah event masih open (ada gelombang yg aktif)
export function isEventOpen(
  event: EventData,
  now: Date = getCurrentDate(),
): boolean {
  return getActiveWave(event, now) !== null;
}

// Helper: ambil tanggal penutupan terakhir
export function getLastCloseDate(event: EventData): Date {
  const lastWave = event.waves[event.waves.length - 1];
  return lastWave.endDate;
}

// Helper: ambil tanggal buka pertama
export function getFirstOpenDate(event: EventData): Date {
  return event.waves[0].startDate;
}

/**
 * Deskripsi kondisional berdasarkan tanggal sekarang:
 * - Jika belum buka → "Pendaftaran dibuka pada {tanggal}"
 * - Jika sedang buka (ada gelombang) → "{label} • {start} – {end}"
 * - Jika sudah tutup → "Pendaftaran ditutup pada {tanggal}"
 */
export function getEventDescription(
  event: EventData,
  now: Date = getCurrentDate(),
): string {
  const firstOpen = getFirstOpenDate(event);
  const lastClose = getLastCloseDate(event);
  const lastCloseEnd = new Date(lastClose);
  lastCloseEnd.setHours(23, 59, 59, 999);

  // Belum buka
  if (now < firstOpen) {
    return `Pendaftaran dibuka pada ${formatDate(firstOpen)}`;
  }

  // Sudah tutup semua
  if (now > lastCloseEnd) {
    return `Pendaftaran ditutup pada ${formatDate(lastClose)}`;
  }

  // Cek gelombang aktif
  const activeWave = getActiveWave(event, now);
  if (activeWave) {
    return `${activeWave.label} • ${formatDate(activeWave.startDate)} – ${formatDate(activeWave.endDate)}`;
  }

  // Di antara gelombang (gap)
  return `Pendaftaran akan segera dibuka kembali`;
}
