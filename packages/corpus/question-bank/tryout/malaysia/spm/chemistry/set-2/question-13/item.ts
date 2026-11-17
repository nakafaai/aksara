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
            "$$\\text{Fe}_2\\text{O}_3$$, $$4.00\\text{ g}$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$3.00\\text{ g}$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$4.00\\text{ g}$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$4.00\\text{ g}$$, $$150\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{Fe}_2\\text{O}_3$$, $$4.00\\text{ g}$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$3.00\\text{ g}$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$4.00\\text{ g}$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Fe}_3\\text{O}_4$$, $$4.00\\text{ g}$$, $$150\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
