import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$10.0\\%$$, $$0.0620\\text{ g}$$, $$0.0200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$4.00\\%$$, $$0.0248\\text{ g}$$, $$0.0200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$25.0\\%$$, $$0.155\\text{ g}$$, $$0.0200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$25.0\\%$$, $$0.155\\text{ g}$$, $$0.00800\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$10.0\\%$$, $$0.0620\\text{ g}$$, $$0.0200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$4.00\\%$$, $$0.0248\\text{ g}$$, $$0.0200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$25.0\\%$$, $$0.155\\text{ g}$$, $$0.0200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$25.0\\%$$, $$0.155\\text{ g}$$, $$0.00800\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
