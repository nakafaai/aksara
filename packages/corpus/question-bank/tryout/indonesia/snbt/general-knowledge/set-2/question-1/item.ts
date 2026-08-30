import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "verschlechtern.",
        },
        {
          isCorrect: false,
          label: "verursachen.",
        },
        {
          isCorrect: false,
          label: "fördern.",
        },
        {
          isCorrect: true,
          label: "verringern.",
        },
        {
          isCorrect: false,
          label: "beseitigen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "worsen." },
        { isCorrect: false, label: "cause." },
        { isCorrect: false, label: "foster." },
        { isCorrect: true, label: "reduce." },
        { isCorrect: false, label: "eliminate." },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "memperparah." },
        { isCorrect: false, label: "menyebabkan." },
        { isCorrect: false, label: "menumbuhkan." },
        { isCorrect: true, label: "mengurangi." },
        { isCorrect: false, label: "menghilangkan." },
      ],
    },
  },
};

export default item;
