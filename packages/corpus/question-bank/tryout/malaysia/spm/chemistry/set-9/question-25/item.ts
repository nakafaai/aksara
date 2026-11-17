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
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.158\\text{ g}$$, $$31.7\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.0500\\text{ mol dm}^{-3}$$, $$0.158\\text{ g}$$, $$31.7\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.106\\text{ g}$$, $$21.1\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.264\\text{ g}$$, $$52.8\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.158\\text{ g}$$, $$31.7\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.0500\\text{ mol dm}^{-3}$$, $$0.158\\text{ g}$$, $$31.7\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.106\\text{ g}$$, $$21.1\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.100\\text{ mol dm}^{-3}$$, $$0.264\\text{ g}$$, $$52.8\\%$$",
        },
      ],
    },
  },
};

export default item;
