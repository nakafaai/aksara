import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Montag" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Dienstag" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Mittwoch" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Donnerstag" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Freitag" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Monday" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Tuesday" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Wednesday" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Thursday" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Friday" }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Senin" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Selasa" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Rabu" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Kamis" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Jumat" }] },
      ],
    },
  },
};

export default item;
