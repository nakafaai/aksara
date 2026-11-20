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
          label:
            "$$\\text{Pb}_3\\text{O}_4$$, $$0.640\\text{ g}$$, $$\\tfrac{1}{3}$$",
        },
        {
          correct: true,
          label:
            "$$\\text{Pb}_3\\text{O}_4$$, $$0.720\\text{ g}$$, $$\\tfrac{1}{3}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Pb}_3\\text{O}_4$$, $$0.720\\text{ g}$$, $$\\tfrac{2}{3}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Pb}_3\\text{O}_4$$, $$1.44\\text{ g}$$, $$\\tfrac{1}{3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{Pb}_3\\text{O}_4$$, $$0.640\\text{ g}$$, $$\\tfrac{1}{3}$$",
        },
        {
          correct: true,
          label:
            "$$\\text{Pb}_3\\text{O}_4$$, $$0.720\\text{ g}$$, $$\\tfrac{1}{3}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Pb}_3\\text{O}_4$$, $$0.720\\text{ g}$$, $$\\tfrac{2}{3}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Pb}_3\\text{O}_4$$, $$1.44\\text{ g}$$, $$\\tfrac{1}{3}$$",
        },
      ],
    },
  },
};

export default item;
