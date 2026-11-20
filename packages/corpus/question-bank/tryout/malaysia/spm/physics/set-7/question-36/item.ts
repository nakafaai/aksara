import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$23\\text{ mA}$$, $$0.82\\text{ mA}$$ and $$61\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ mA}$$, $$0.82\\text{ mA}$$ and $$83\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ mA}$$, $$0.89\\text{ mA}$$ and $$61\\text{ k}\\Omega$$",
        },
        {
          correct: true,
          label:
            "$$20\\text{ mA}$$, $$0.82\\text{ mA}$$ and $$61\\text{ k}\\Omega$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$23\\text{ mA}$$, $$0.82\\text{ mA}$$ dan $$61\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ mA}$$, $$0.82\\text{ mA}$$ dan $$83\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ mA}$$, $$0.89\\text{ mA}$$ dan $$61\\text{ k}\\Omega$$",
        },
        {
          correct: true,
          label:
            "$$20\\text{ mA}$$, $$0.82\\text{ mA}$$ dan $$61\\text{ k}\\Omega$$",
        },
      ],
    },
  },
};

export default item;
