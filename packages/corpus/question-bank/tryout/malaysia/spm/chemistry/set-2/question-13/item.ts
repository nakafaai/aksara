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
          label: "$$\\text{FeO}$$, $$960\\text{ cm}^3$$, $$4.00\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$480\\text{ cm}^3$$, $$2.00\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$960\\text{ cm}^3$$, $$4.00\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$960\\text{ cm}^3$$, $$1.76\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{FeO}$$, $$960\\text{ cm}^3$$, $$4.00\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$480\\text{ cm}^3$$, $$2.00\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$960\\text{ cm}^3$$, $$4.00\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$960\\text{ cm}^3$$, $$1.76\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
