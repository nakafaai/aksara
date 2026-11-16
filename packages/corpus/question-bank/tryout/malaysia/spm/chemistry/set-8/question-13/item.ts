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
          label: "$$\\text{X}_2\\text{Y}$$, $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$\\text{X}_2\\text{Y}$$, $$0.10\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}$$, $$0.16\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$\\text{X}_2\\text{Y}$$, $$0.40\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{X}_2\\text{Y}$$, $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$\\text{X}_2\\text{Y}$$, $$0.10\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}$$, $$0.16\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$\\text{X}_2\\text{Y}$$, $$0.40\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
