import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$43\\text{ N m}^{-1}$$, $$0.19\\text{ J}$$ and $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$50\\text{ N m}^{-1}$$, $$0.32\\text{ J}$$ and $$4.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$50\\text{ N m}^{-1}$$, $$0.16\\text{ J}$$ and $$4.0\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$50\\text{ N m}^{-1}$$, $$0.16\\text{ J}$$ and $$2.8\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$43\\text{ N m}^{-1}$$, $$0.19\\text{ J}$$ dan $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$50\\text{ N m}^{-1}$$, $$0.32\\text{ J}$$ dan $$4.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$50\\text{ N m}^{-1}$$, $$0.16\\text{ J}$$ dan $$4.0\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$50\\text{ N m}^{-1}$$, $$0.16\\text{ J}$$ dan $$2.8\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
