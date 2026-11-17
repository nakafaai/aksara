import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.21\\text{ g}$$, $$0\\text{ mol dm}^{-3}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.909\\text{ g}$$, $$0.000500\\text{ mol dm}^{-3}$$, $$0.212\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.909\\text{ g}$$, $$0.000500\\text{ mol dm}^{-3}$$, $$0.0530\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.909\\text{ g}$$, $$0.000500\\text{ mol dm}^{-3}$$, $$0.106\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.21\\text{ g}$$, $$0\\text{ mol dm}^{-3}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.909\\text{ g}$$, $$0.000500\\text{ mol dm}^{-3}$$, $$0.212\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.909\\text{ g}$$, $$0.000500\\text{ mol dm}^{-3}$$, $$0.0530\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.909\\text{ g}$$, $$0.000500\\text{ mol dm}^{-3}$$, $$0.106\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
