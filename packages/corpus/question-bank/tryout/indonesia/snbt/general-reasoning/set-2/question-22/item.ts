import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Abteilung A",
        },
        {
          isCorrect: true,
          label: "Abteilung C",
        },
        {
          isCorrect: false,
          label: "Abteilung B",
        },
        {
          isCorrect: false,
          label: "Abteilung D",
        },
        {
          isCorrect: false,
          label: "Abteilung E",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Division A" },
        { isCorrect: true, label: "Division C" },
        { isCorrect: false, label: "Division B" },
        { isCorrect: false, label: "Division D" },
        { isCorrect: false, label: "Division E" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Divisi A" },
        { isCorrect: true, label: "Divisi C" },
        { isCorrect: false, label: "Divisi B" },
        { isCorrect: false, label: "Divisi D" },
        { isCorrect: false, label: "Divisi E" },
      ],
    },
  },
};

export default item;
