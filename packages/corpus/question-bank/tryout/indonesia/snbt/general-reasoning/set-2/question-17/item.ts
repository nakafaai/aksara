import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Wissenschaft",
        },
        {
          isCorrect: false,
          label: "Religion",
        },
        {
          isCorrect: false,
          label: "Literatur",
        },
        {
          isCorrect: true,
          label: "Wörterbuch",
        },
        {
          isCorrect: false,
          label: "Geschichte",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Science" },
        { isCorrect: false, label: "Religion" },
        { isCorrect: false, label: "Literature" },
        { isCorrect: true, label: "Dictionary" },
        { isCorrect: false, label: "History" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Sains" },
        { isCorrect: false, label: "Agama" },
        { isCorrect: false, label: "Sastra" },
        { isCorrect: true, label: "Kamus" },
        { isCorrect: false, label: "Sejarah" },
      ],
    },
  },
};

export default item;
