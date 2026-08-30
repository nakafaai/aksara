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
          isCorrect: false,
          label: "Abteilung B",
        },
        {
          isCorrect: false,
          label: "Abteilung C",
        },
        {
          isCorrect: true,
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
        { isCorrect: false, label: "Division B" },
        { isCorrect: false, label: "Division C" },
        { isCorrect: true, label: "Division D" },
        { isCorrect: false, label: "Division E" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Divisi A" },
        { isCorrect: false, label: "Divisi B" },
        { isCorrect: false, label: "Divisi C" },
        { isCorrect: true, label: "Divisi D" },
        { isCorrect: false, label: "Divisi E" },
      ],
    },
  },
};

export default item;
