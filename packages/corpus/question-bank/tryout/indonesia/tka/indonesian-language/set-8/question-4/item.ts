import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "sea-sasi",
  versions: {
    id: {
      columns: ["Aturan sasi", "Hasil buka sasi", "Tantangan dan tanggapan"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Warga dilarang memungut lola selama dua tahun." },
        {
          column: 2,
          label:
            "Hasil penjualan dibagi untuk keluarga penyelam dan kas negeri.",
        },
        {
          column: 3,
          label: "Perahu bermotor dari luar daerah datang pada malam hari.",
        },
        { column: 1, label: "Pelanggar membayar denda kepada negeri." },
      ],
    },
  },
};

export default item;
