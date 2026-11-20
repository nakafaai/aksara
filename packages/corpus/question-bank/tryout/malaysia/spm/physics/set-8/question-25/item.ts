import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.09\\text{ g cm}^{-3}$$, it falls by $$1.0\\text{ cm}$$, and it falls by $$0.33\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$1.09\\text{ g cm}^{-3}$$, it does not change, and it does not change",
        },
        {
          correct: false,
          label:
            "$$1.09\\text{ g cm}^{-3}$$, it falls by $$0.50\\text{ cm}$$, and it does not change",
        },
        {
          correct: true,
          label:
            "$$1.09\\text{ g cm}^{-3}$$, it falls by $$0.50\\text{ cm}$$, and it falls by $$0.33\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.09\\text{ g cm}^{-3}$$, ia turun sebanyak $$1.0\\text{ cm}$$, dan ia turun sebanyak $$0.33\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$1.09\\text{ g cm}^{-3}$$, ia tidak berubah, dan ia tidak berubah",
        },
        {
          correct: false,
          label:
            "$$1.09\\text{ g cm}^{-3}$$, ia turun sebanyak $$0.50\\text{ cm}$$, dan ia tidak berubah",
        },
        {
          correct: true,
          label:
            "$$1.09\\text{ g cm}^{-3}$$, ia turun sebanyak $$0.50\\text{ cm}$$, dan ia turun sebanyak $$0.33\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
