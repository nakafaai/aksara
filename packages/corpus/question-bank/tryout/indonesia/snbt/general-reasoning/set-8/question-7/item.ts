import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Setiap komponen di rak C telah lolos pemeriksaan awal.",
        },
        {
          isCorrect: false,
          label:
            "Komponen yang gagal dalam pemeriksaan awal tidak pernah menjalani uji ketahanan.",
        },
        {
          isCorrect: true,
          label: "Setiap komponen bersegel biru ditempatkan di rak C.",
        },
        {
          isCorrect: false,
          label: "Hanya komponen bersegel biru yang menjalani uji ketahanan.",
        },
        {
          isCorrect: false,
          label:
            "Setiap komponen yang diperiksa pada tahap awal mendapat segel biru.",
        },
      ],
    },
  },
};

export default item;
