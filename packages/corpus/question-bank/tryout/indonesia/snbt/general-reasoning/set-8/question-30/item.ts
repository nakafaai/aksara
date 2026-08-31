import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Präsentation $$A$$" },
        { isCorrect: false, label: "Präsentation $$C$$" },
        { isCorrect: false, label: "Präsentation $$D$$" },
        { isCorrect: false, label: "Nicht eindeutig bestimmbar" },
        { isCorrect: true, label: "Präsentation $$F$$" },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Presentation $$A$$" },
        { isCorrect: false, label: "Presentation $$C$$" },
        { isCorrect: false, label: "Presentation $$D$$" },
        { isCorrect: false, label: "It cannot be determined uniquely" },
        { isCorrect: true, label: "Presentation $$F$$" },
      ],
    },
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
