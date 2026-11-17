import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.635\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$1.27\\text{ g}$$, $$0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$0.635\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$0.318\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.635\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$1.27\\text{ g}$$, $$0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$0.635\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$0.318\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
