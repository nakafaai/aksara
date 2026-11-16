import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$40\\text{ cm}^3$$ of propane, $$320\\text{ cm}^3$$ of oxygen",
        },
        {
          correct: false,
          label:
            "$$60\\text{ cm}^3$$ of propane, $$300\\text{ cm}^3$$ of oxygen",
        },
        {
          correct: false,
          label:
            "$$60\\text{ cm}^3$$ of propane, $$500\\text{ cm}^3$$ of oxygen",
        },
        {
          correct: true,
          label:
            "$$60\\text{ cm}^3$$ of propane, $$380\\text{ cm}^3$$ of oxygen",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40\\text{ cm}^3$$ propana, $$320\\text{ cm}^3$$ oksigen",
        },
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$ propana, $$300\\text{ cm}^3$$ oksigen",
        },
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$ propana, $$500\\text{ cm}^3$$ oksigen",
        },
        {
          correct: true,
          label: "$$60\\text{ cm}^3$$ propana, $$380\\text{ cm}^3$$ oksigen",
        },
      ],
    },
  },
};

export default item;
