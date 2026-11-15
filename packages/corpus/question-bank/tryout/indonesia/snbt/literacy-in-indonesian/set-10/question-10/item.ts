import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "implicit-information",
  },
  stimulus: "crossing-guard",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Cara palang diturunkan sekarang berbeda dari cara ayah Rani dulu menurunkannya.",
        },
        {
          column: 2,
          label:
            "Kereta jam empat terlambat pada hari ulang tahun Rani yang kesembilan.",
        },
        {
          column: 1,
          label:
            "Pada hari ulang tahun Rani yang kesembilan, kereta jam lima sudah lewat sebelum ayahnya pulang.",
        },
        {
          column: 2,
          label:
            "Penjaga muda mengenali Rani sebagai anak penjaga yang dulu bertugas di pos itu.",
        },
        {
          column: 2,
          label:
            "Potongan koran itu menyebut bahwa penjaga yang membantu korban adalah ayah Rani.",
        },
      ],
    },
  },
};

export default item;
