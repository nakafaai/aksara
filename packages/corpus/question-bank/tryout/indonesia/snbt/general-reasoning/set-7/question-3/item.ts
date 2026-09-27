import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sensor mengalami gangguan.",
        },
        {
          isCorrect: true,
          label: "Pembersihan harian yang dijadwalkan tidak dilewatkan.",
        },
        {
          isCorrect: false,
          label: "Lampu peringatan menyala.",
        },
        {
          isCorrect: false,
          label: "Residu tertinggal pada sensor.",
        },
        {
          isCorrect: false,
          label: "Pembersihan harian yang dijadwalkan dilewatkan.",
        },
      ],
    },
  },
};

export default item;
