import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.7\\text{ m s}^{-2}$$, $$160\\text{ kg}$$ and $$4.5\\text{ mm}$$",
        },
        {
          correct: false,
          label:
            "$$3.7\\text{ m s}^{-2}$$, $$61\\text{ kg}$$ and $$4.5\\text{ mm}$$",
        },
        {
          correct: true,
          label:
            "$$3.7\\text{ m s}^{-2}$$, $$160\\text{ kg}$$ and $$12\\text{ mm}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\text{ m s}^{-2}$$, $$300\\text{ kg}$$ and $$22\\text{ mm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.7\\text{ m s}^{-2}$$, $$160\\text{ kg}$$ dan $$4.5\\text{ mm}$$",
        },
        {
          correct: false,
          label:
            "$$3.7\\text{ m s}^{-2}$$, $$61\\text{ kg}$$ dan $$4.5\\text{ mm}$$",
        },
        {
          correct: true,
          label:
            "$$3.7\\text{ m s}^{-2}$$, $$160\\text{ kg}$$ dan $$12\\text{ mm}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\text{ m s}^{-2}$$, $$300\\text{ kg}$$ dan $$22\\text{ mm}$$",
        },
      ],
    },
  },
};

export default item;
