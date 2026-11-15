import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "spelling-reform",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Buku pelajaran yang dicetak pada 1960 sesuai pedoman resmi menulis kata *yang* sebagai *jang*.",
        },
        {
          column: 1,
          label:
            "Sejak 1947, ejaan resmi tidak lagi memakai *oe* untuk bunyi /u/.",
        },
        {
          column: 2,
          label: "Pembaruan 1972 mengubah cara orang mengucapkan kata *cinta*.",
        },
        {
          column: 1,
          label:
            "Dalam dokumen resmi sesudah 1972, nama diri tidak selalu ditulis dengan ejaan yang berlaku.",
        },
      ],
    },
  },
};

export default item;
