import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$75\\%$$, $$1.3\\text{ °C h}^{-1}$$ and $$25\\text{ °C}$$",
        },
        {
          correct: true,
          label: "$$90\\%$$, $$1.5\\text{ °C h}^{-1}$$ and $$23\\text{ °C}$$",
        },
        {
          correct: false,
          label: "$$90\\%$$, $$1.7\\text{ °C h}^{-1}$$ and $$23\\text{ °C}$$",
        },
        {
          correct: false,
          label: "$$90\\%$$, $$1.5\\text{ °C h}^{-1}$$ and $$22\\text{ °C}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$75\\%$$, $$1.3\\text{ °C j}^{-1}$$ dan $$25\\text{ °C}$$",
        },
        {
          correct: true,
          label: "$$90\\%$$, $$1.5\\text{ °C j}^{-1}$$ dan $$23\\text{ °C}$$",
        },
        {
          correct: false,
          label: "$$90\\%$$, $$1.7\\text{ °C j}^{-1}$$ dan $$23\\text{ °C}$$",
        },
        {
          correct: false,
          label: "$$90\\%$$, $$1.5\\text{ °C j}^{-1}$$ dan $$22\\text{ °C}$$",
        },
      ],
    },
  },
};

export default item;
