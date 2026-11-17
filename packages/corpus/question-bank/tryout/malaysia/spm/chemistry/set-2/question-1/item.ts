import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.400\\text{ mol dm}^{-3}$$, $$1.15\\text{ g}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.287\\text{ g}$$, $$62.5\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.287\\text{ g}$$, $$12.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.117\\text{ g}$$, $$12.5\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.400\\text{ mol dm}^{-3}$$, $$1.15\\text{ g}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.287\\text{ g}$$, $$62.5\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.287\\text{ g}$$, $$12.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.117\\text{ g}$$, $$12.5\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
