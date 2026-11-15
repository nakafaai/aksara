import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "variation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\tfrac12$$, $$47$$",
        },
        {
          correct: false,
          label: "$$\\tfrac14$$, $$45$$",
        },
        {
          correct: false,
          label: "$$\\tfrac12$$, $$45$$",
        },
        {
          correct: true,
          label: "$$\\tfrac14$$, $$47$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\tfrac12$$, $$47$$",
        },
        {
          correct: false,
          label: "$$\\tfrac14$$, $$45$$",
        },
        {
          correct: false,
          label: "$$\\tfrac12$$, $$45$$",
        },
        {
          correct: true,
          label: "$$\\tfrac14$$, $$47$$",
        },
      ],
    },
  },
};

export default item;
