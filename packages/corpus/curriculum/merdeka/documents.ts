/**
 * Official documents the Merdeka mappings cite. CP 046 is the learning
 * outcomes in force (it revokes 032/H/KR/2024); the ministry's host did not
 * answer, so the address is the signed copy the mapping audit read. Each book
 * address is the ministry's own file, listed in its SIBI catalog.
 */

const bookHost =
  "http://static.buku.kemendikdasmen.go.id/content/pdf/bukuteks/kurikulum21";

/** Keputusan Kepala BSKAP 046/H/KR/2025, Lampiran II (SD, SMP, SMA). */
export const merdekaLearningOutcomes = {
  title:
    "Keputusan Kepala BSKAP Nomor 046/H/KR/2025 tentang Capaian Pembelajaran, Lampiran II",
  url: "https://drive.google.com/file/d/1hMcojdIQoaoLWViTdr7GTFcmFh8TBKe_/view",
};

/** Matematika untuk SMA/MA/SMK/MAK Kelas X, Edisi Revisi 2023. */
export const mathematicsBookX = {
  title: "Matematika untuk SMA/MA/SMK/MAK Kelas X (Edisi Revisi)",
  url: `${bookHost}/Matematika_BS_KLS_X_Rev.pdf`,
};

/** Matematika untuk SMA/MA/SMK/MAK Kelas XI, Edisi Revisi 2024. */
export const mathematicsBookXI = {
  title: "Matematika untuk SMA/MA/SMK/MAK Kelas XI (Edisi Revisi)",
  url: `${bookHost}/Matematika_BS_KLS_XI_Rev.pdf`,
};

/** Matematika untuk SMA/MA/SMK/MAK Kelas XII, Edisi Revisi 2025. */
export const mathematicsBookXII = {
  title: "Matematika untuk SMA/MA/SMK/MAK Kelas XII (Edisi Revisi)",
  url: `${bookHost}/Matematika_BS_KLS_XII_Rev.pdf`,
};

/** Matematika Tingkat Lanjut untuk SMA/MA Kelas XI, Edisi Revisi. */
export const advancedMathematicsBookXI = {
  title: "Matematika Tingkat Lanjut untuk SMA/MA Kelas XI (Edisi Revisi)",
  url: `${bookHost}/Matematika_BS_KLS_XI_TL_Rev.pdf`,
};

/**
 * Matematika Tingkat Lanjut untuk SMA/MA Kelas XI, first edition 2021: the
 * last book with a Bilangan Kompleks chapter, kept as enrichment (D11).
 */
export const advancedMathematicsFirstBookXI = {
  title:
    "Matematika Tingkat Lanjut untuk SMA/MA Kelas XI (Cetakan Pertama 2021)",
  url: `${bookHost}/Matematika-Tingkat-Lanjut-BS-KLS-XI.pdf`,
};

/** Matematika Tingkat Lanjut untuk SMA/MA Kelas XII, Edisi Revisi. */
export const advancedMathematicsBookXII = {
  title: "Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi)",
  url: `${bookHost}/Matematika_BS_XII_TL_Rev.pdf`,
};

/** Ilmu Pengetahuan Alam untuk SMA/MA Kelas X, Edisi Revisi 2023. */
export const scienceBookX = {
  title: "Ilmu Pengetahuan Alam untuk SMA/MA Kelas X (Edisi Revisi)",
  url: `${bookHost}/IPA_BS_KLS_X_Rev.pdf`,
};

/** Fisika untuk SMA/MA Kelas XI, 2022. */
export const physicsBookXI = {
  title: "Fisika untuk SMA/MA Kelas XI",
  url: `${bookHost}/Fisika-BS-KLS-XI.pdf`,
};
