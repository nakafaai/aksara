import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.0800\\text{ mol dm}^{-3}$$, $$0.287\\text{ g}$$, $$0.0400\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.0400\\text{ mol dm}^{-3}$$, $$0.144\\text{ g}$$, $$0.0533\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.0800\\text{ mol dm}^{-3}$$, $$0.287\\text{ g}$$, $$0.0600\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.0800\\text{ mol dm}^{-3}$$, $$0.718\\text{ g}$$, $$0\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.0800\\text{ mol dm}^{-3}$$, $$0.287\\text{ g}$$, $$0.0400\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.0400\\text{ mol dm}^{-3}$$, $$0.144\\text{ g}$$, $$0.0533\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.0800\\text{ mol dm}^{-3}$$, $$0.287\\text{ g}$$, $$0.0600\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.0800\\text{ mol dm}^{-3}$$, $$0.718\\text{ g}$$, $$0\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
