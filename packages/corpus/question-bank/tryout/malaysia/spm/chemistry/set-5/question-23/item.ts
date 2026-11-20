import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$26.8\\text{ h}$$, $$15.0\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$53.6\\text{ h}$$, $$3.00\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$53.6\\text{ h}$$, $$15.0\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$53.6\\text{ h}$$, $$15.0\\text{ dm}^3$$, $$9.00\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$26.8\\text{ h}$$, $$15.0\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$53.6\\text{ h}$$, $$3.00\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$53.6\\text{ h}$$, $$15.0\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$53.6\\text{ h}$$, $$15.0\\text{ dm}^3$$, $$9.00\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
