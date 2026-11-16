import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.40\\text{ m}$$ east",
        },
        {
          correct: false,
          label: "$$0.80\\text{ m}$$ east",
        },
        {
          correct: false,
          label: "$$0.20\\text{ m}$$ east",
        },
        {
          correct: false,
          label: "$$0.80\\text{ m}$$ west",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.40\\text{ m}$$ ke timur",
        },
        {
          correct: false,
          label: "$$0.80\\text{ m}$$ ke timur",
        },
        {
          correct: false,
          label: "$$0.20\\text{ m}$$ ke timur",
        },
        {
          correct: false,
          label: "$$0.80\\text{ m}$$ ke barat",
        },
      ],
    },
  },
};

export default item;
