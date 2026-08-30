import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Abteilung A" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Abteilung B" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Abteilung C" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Abteilung D" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Abteilung E" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Division A" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Division B" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Division C" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Division D" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Division E" }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Divisi A" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Divisi B" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Divisi C" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Divisi D" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Divisi E" }] },
      ],
    },
  },
};

export default item;
