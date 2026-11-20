/**
 * Official documents the Merdeka mappings cite. CP 046 is the learning
 * outcomes in force (it revokes 032/H/KR/2024); the ministry's host did not
 * answer, so the address is the signed copy the mapping audit read. Each book
 * address is the file the ministry's SIBI catalog API serves for that book.
 */

const bookHost =
  "https://static-sc.cloudapp.web.id/content/pdf/bukuteks/kurikulum21";

/** Keputusan Kepala BSKAP 046/H/KR/2025, Lampiran II (SD, SMP, SMA). */
export const merdekaLearningOutcomes = {
  citation:
    "Keputusan Kepala BSKAP Nomor 046/H/KR/2025 tentang Capaian Pembelajaran, Lampiran II",
  url: "https://drive.google.com/file/d/1hMcojdIQoaoLWViTdr7GTFcmFh8TBKe_/view",
};

/** Matematika untuk SMA/MA/SMK/MAK Kelas X, Edisi Revisi 2023. */
export const mathematicsBookX = {
  citation: "Matematika untuk SMA/MA/SMK/MAK Kelas X (Edisi Revisi)",
  url: `${bookHost}/Matematika_BS_KLS_X_Rev.pdf`,
};

/** Matematika untuk SMA/MA/SMK/MAK Kelas XI, Edisi Revisi 2024. */
export const mathematicsBookXI = {
  citation: "Matematika untuk SMA/MA/SMK/MAK Kelas XI (Edisi Revisi)",
  url: `${bookHost}/Matematika_BS_KLS_XI_Rev.pdf`,
};

/** Matematika untuk SMA/MA/SMK/MAK Kelas XII, Edisi Revisi 2025. */
export const mathematicsBookXII = {
  citation: "Matematika untuk SMA/MA/SMK/MAK Kelas XII (Edisi Revisi)",
  url: `${bookHost}/Matematika_BS_KLS_XII_Rev.pdf`,
};

/** Matematika Tingkat Lanjut untuk SMA/MA Kelas XI, Edisi Revisi. */
export const advancedMathematicsBookXI = {
  citation: "Matematika Tingkat Lanjut untuk SMA/MA Kelas XI (Edisi Revisi)",
  url: `${bookHost}/Matematika_BS_KLS_XI_TL_Rev.pdf`,
};

/**
 * Matematika Tingkat Lanjut untuk SMA/MA Kelas XI, first edition 2021: the
 * last book with a Bilangan Kompleks chapter, kept as enrichment (D11).
 */
export const advancedMathematicsFirstBookXI = {
  citation:
    "Matematika Tingkat Lanjut untuk SMA/MA Kelas XI (Cetakan Pertama 2021)",
  url: `${bookHost}/Matematika-Tingkat-Lanjut-BS-KLS-XI.pdf`,
};

/** Matematika Tingkat Lanjut untuk SMA/MA Kelas XII, Edisi Revisi. */
export const advancedMathematicsBookXII = {
  citation: "Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi)",
  url: `${bookHost}/Matematika_BS_XII_TL_Rev.pdf`,
};

/** Ilmu Pengetahuan Alam untuk SMA/MA Kelas X, Edisi Revisi 2023. */
export const scienceBookX = {
  citation: "Ilmu Pengetahuan Alam untuk SMA/MA Kelas X (Edisi Revisi)",
  url: `${bookHost}/IPA_BS_KLS_X_Rev.pdf`,
};

/** Fisika untuk SMA/MA Kelas XI, 2022. */
export const physicsBookXI = {
  citation: "Fisika untuk SMA/MA Kelas XI",
  url: `${bookHost}/Fisika-BS-KLS-XI.pdf`,
};

/** Kimia untuk SMA/MA Kelas XI, 2022. */
export const chemistryBookXI = {
  citation: "Kimia untuk SMA/MA Kelas XI",
  url: `${bookHost}/Kimia-BS-KLS-XI.pdf`,
};

/** Biologi untuk SMA/MA Kelas XI, 2022. */
export const biologyBookXI = {
  citation: "Biologi untuk SMA/MA Kelas XI",
  url: `${bookHost}/Biologi-BS-KLS-XI.pdf`,
};
