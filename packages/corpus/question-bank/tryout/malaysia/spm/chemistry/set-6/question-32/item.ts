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
          label: "$$40\\text{ cm}^3$$ of propane, $$400\\text{ cm}^3$$ of gas",
        },
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$ of propane, $$660\\text{ cm}^3$$ of gas",
        },
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$ of propane, $$120\\text{ cm}^3$$ of gas",
        },
        {
          correct: true,
          label: "$$60\\text{ cm}^3$$ of propane, $$340\\text{ cm}^3$$ of gas",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40\\text{ cm}^3$$ propana, $$400\\text{ cm}^3$$ gas",
        },
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$ propana, $$660\\text{ cm}^3$$ gas",
        },
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$ propana, $$120\\text{ cm}^3$$ gas",
        },
        {
          correct: true,
          label: "$$60\\text{ cm}^3$$ propana, $$340\\text{ cm}^3$$ gas",
        },
      ],
    },
  },
};

export default item;
