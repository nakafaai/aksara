import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Wissenschaft" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Wörterbuch" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Religion" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Literatur" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Geschichte" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Science" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Dictionary" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Religion" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Literature" }] },
        { isCorrect: false, label: [{ kind: "text", text: "History" }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Sains" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Kamus" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Agama" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Sastra" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Sejarah" }] },
      ],
    },
  },
};

export default item;
