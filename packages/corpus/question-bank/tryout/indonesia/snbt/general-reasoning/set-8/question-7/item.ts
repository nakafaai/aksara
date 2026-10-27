import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Setiap komponen di rak C telah lolos pemeriksaan awal.",
        },
        {
          correct: false,
          label:
            "Komponen yang gagal dalam pemeriksaan awal tidak pernah menjalani uji ketahanan.",
        },
        {
          correct: true,
          label: "Setiap komponen bersegel biru ditempatkan di rak C.",
        },
        {
          correct: false,
          label: "Hanya komponen bersegel biru yang menjalani uji ketahanan.",
        },
        {
          correct: false,
          label:
            "Setiap komponen yang diperiksa pada tahap awal mendapat segel biru.",
        },
      ],
    },
  },
};

export default item;
