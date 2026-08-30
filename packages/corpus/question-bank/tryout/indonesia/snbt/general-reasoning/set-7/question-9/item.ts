import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Montag",
        },
        {
          isCorrect: true,
          label: "Dienstag",
        },
        {
          isCorrect: false,
          label: "Mittwoch",
        },
        {
          isCorrect: false,
          label: "Donnerstag",
        },
        {
          isCorrect: false,
          label: "Freitag",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Monday" },
        { isCorrect: true, label: "Tuesday" },
        { isCorrect: false, label: "Wednesday" },
        { isCorrect: false, label: "Thursday" },
        { isCorrect: false, label: "Friday" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Senin" },
        { isCorrect: true, label: "Selasa" },
        { isCorrect: false, label: "Rabu" },
        { isCorrect: false, label: "Kamis" },
        { isCorrect: false, label: "Jumat" },
      ],
    },
  },
};

export default item;
