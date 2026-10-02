import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar singkat di pasar tukar buku tempat mereka berkunjung.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: true,
          label: "Pengunjung pasar tukar buku memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar yang singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
