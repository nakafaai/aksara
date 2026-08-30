import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Guru" },
        { isCorrect: false, label: "Kepala Desa" },
        { isCorrect: true, label: "Reporter" },
        {
          isCorrect: false,
          label: "Ketua acara adat Festival Munara Beba Byak Karon",
        },
        { isCorrect: false, label: "Penyuluh" },
      ],
    },
  },
};

export default item;
