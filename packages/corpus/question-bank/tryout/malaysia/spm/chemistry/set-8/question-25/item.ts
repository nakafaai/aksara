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
          correct: true,
          label: "$$0.744\\text{ g}$$, decreases by $$0.096\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.331\\text{ g}$$, decreases by $$0.043\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.744\\text{ g}$$, increases by $$0.648\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.744\\text{ g}$$, decreases by $$0.744\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.744\\text{ g}$$, berkurang sebanyak $$0.096\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.331\\text{ g}$$, berkurang sebanyak $$0.043\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.744\\text{ g}$$, bertambah sebanyak $$0.648\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.744\\text{ g}$$, berkurang sebanyak $$0.744\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
