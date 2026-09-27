import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Presentasi $$A$$" },
        { isCorrect: false, label: "Presentasi $$C$$" },
        { isCorrect: false, label: "Presentasi $$D$$" },
        { isCorrect: false, label: "Tidak dapat ditentukan secara unik" },
        { isCorrect: true, label: "Presentasi $$F$$" },
      ],
    },
  },
};

export default item;
