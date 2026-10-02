import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: true,
          label: "Pengguna ruang latihan musik memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat sebagai pengguna yang memakai ruang latihan musik.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
