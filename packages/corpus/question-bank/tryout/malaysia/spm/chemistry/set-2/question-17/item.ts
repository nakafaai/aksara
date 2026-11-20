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
          label:
            "$$81.7\\%$$, $$0.140\\text{ mol dm}^{-3}$$, $$2.05\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$81.7\\%$$, $$0.120\\text{ mol dm}^{-3}$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$81.7\\%$$, $$0.130\\text{ mol dm}^{-3}$$, $$1.90\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40.8\\%$$, $$0.140\\text{ mol dm}^{-3}$$, $$2.05\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$81.7\\%$$, $$0.140\\text{ mol dm}^{-3}$$, $$2.05\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$81.7\\%$$, $$0.120\\text{ mol dm}^{-3}$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$81.7\\%$$, $$0.130\\text{ mol dm}^{-3}$$, $$1.90\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40.8\\%$$, $$0.140\\text{ mol dm}^{-3}$$, $$2.05\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
