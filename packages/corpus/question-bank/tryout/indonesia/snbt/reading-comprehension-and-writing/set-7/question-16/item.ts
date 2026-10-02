import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Peminjam payung memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: false,
          label:
            "Peminjam payung memberikan komentar singkat sebagai peminjam yang meminjam payung.",
        },
        {
          isCorrect: false,
          label:
            "Peminjam payung memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: true,
          label: "Peminjam payung memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Peminjam payung memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
