import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengunjung taman memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: true,
          label: "Pengunjung taman memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung taman memberikan komentar singkat sebagai orang yang mengunjungi taman.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung taman memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung taman memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
