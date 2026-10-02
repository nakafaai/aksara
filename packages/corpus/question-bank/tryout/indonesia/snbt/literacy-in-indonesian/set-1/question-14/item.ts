import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Berendam di dalam lumpur",
        },
        {
          isCorrect: false,
          label: "Bekerja dengan sangat sibuk",
        },
        {
          isCorrect: false,
          label: "Berkumpul dalam satu kelompok",
        },
        {
          isCorrect: true,
          label: "Terjebak dalam keadaan yang tidak menyenangkan",
        },
        {
          isCorrect: false,
          label: "Berlumuran oleh suatu benda",
        },
      ],
    },
  },
};

export default item;
