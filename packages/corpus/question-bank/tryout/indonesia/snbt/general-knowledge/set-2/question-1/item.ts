import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "verschlechtern." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "verursachen." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "fördern." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "verringern." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "beseitigen." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "worsen." }] },
        { isCorrect: false, label: [{ kind: "text", text: "cause." }] },
        { isCorrect: false, label: [{ kind: "text", text: "foster." }] },
        { isCorrect: true, label: [{ kind: "text", text: "reduce." }] },
        { isCorrect: false, label: [{ kind: "text", text: "eliminate." }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "memperparah." }] },
        { isCorrect: false, label: [{ kind: "text", text: "menyebabkan." }] },
        { isCorrect: false, label: [{ kind: "text", text: "menumbuhkan." }] },
        { isCorrect: true, label: [{ kind: "text", text: "mengurangi." }] },
        { isCorrect: false, label: [{ kind: "text", text: "menghilangkan." }] },
      ],
    },
  },
};

export default item;
