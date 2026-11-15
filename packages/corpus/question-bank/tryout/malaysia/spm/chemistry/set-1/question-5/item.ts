import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{CH}_2$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_4$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_4\\text{H}_8$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_2\\text{H}_4$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{CH}_2$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_4$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_4\\text{H}_8$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_2\\text{H}_4$$",
        },
      ],
    },
  },
};

export default item;
