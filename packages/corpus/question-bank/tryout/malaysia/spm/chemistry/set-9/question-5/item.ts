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
          correct: true,
          label: "$$3.46\\text{ g}$$, $$0.364\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$4.61\\text{ g}$$, $$0.364\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$3.46\\text{ g}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$3.46\\text{ g}$$, $$0.182\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3.46\\text{ g}$$, $$0.364\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$4.61\\text{ g}$$, $$0.364\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$3.46\\text{ g}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$3.46\\text{ g}$$, $$0.182\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
