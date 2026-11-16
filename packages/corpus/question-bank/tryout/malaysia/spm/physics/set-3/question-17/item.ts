import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$33^\\circ$$",
        },
        {
          correct: false,
          label: "$$21^\\circ$$",
        },
        {
          correct: false,
          label: "$$69^\\circ$$",
        },
        {
          correct: false,
          label: "$$90^\\circ$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$33^\\circ$$",
        },
        {
          correct: false,
          label: "$$21^\\circ$$",
        },
        {
          correct: false,
          label: "$$69^\\circ$$",
        },
        {
          correct: false,
          label: "$$90^\\circ$$",
        },
      ],
    },
  },
};

export default item;
