/**
 * Evidence shared by the SPM science Paper 1 tracks. The Lembaga Peperiksaan
 * site does not resolve outside Malaysia, so the timetable is read from its
 * Wayback Machine copy and the format book from a teacher's reproduction of
 * the Lembaga Peperiksaan document.
 */
export const spmEvidence = [
  {
    key: "spm-2021-timetable",
    label: "Jadual Waktu Peperiksaan SPM 2021, Lembaga Peperiksaan",
    retrievedAt: "2026-11-15",
    url: "https://web.archive.org/web/20230128110850/http://lp.moe.gov.my/files/JWP/2021/JWP%20SPM%202021_Pin1_2021.pdf",
  },
  {
    key: "spm-science-format",
    label:
      "Penataran Format Instrumen Peperiksaan SPM bagi mata pelajaran KSSM mulai tahun 2021, Lembaga Peperiksaan",
    retrievedAt: "2026-11-15",
    url: "https://anyflip.com/enliw/dosb/basic",
  },
] as const;
