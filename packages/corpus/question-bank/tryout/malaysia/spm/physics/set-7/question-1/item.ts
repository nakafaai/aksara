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
          label: "$$50\\text{ N m}^{-1}$$ and $$0.40\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$43\\text{ N m}^{-1}$$ and $$0.16\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$50\\text{ N m}^{-1}$$ and $$0.32\\text{ J}$$",
        },
        {
          correct: true,
          label: "$$50\\text{ N m}^{-1}$$ and $$0.16\\text{ J}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$50\\text{ N m}^{-1}$$ dan $$0.40\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$43\\text{ N m}^{-1}$$ dan $$0.16\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$50\\text{ N m}^{-1}$$ dan $$0.32\\text{ J}$$",
        },
        {
          correct: true,
          label: "$$50\\text{ N m}^{-1}$$ dan $$0.16\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
