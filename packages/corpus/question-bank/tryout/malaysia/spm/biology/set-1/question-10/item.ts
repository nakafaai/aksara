import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cellular-respiration",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.80\\text{ dm}^3$$ and $$21.0\\text{ kJ}$$",
        },
        {
          correct: true,
          label: "$$5.76\\text{ dm}^3$$ and $$47.9\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$3.60\\text{ dm}^3$$ and $$47.9\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$14.4\\text{ dm}^3$$ and $$289.8\\text{ kJ}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.80\\text{ dm}^3$$ dan $$21.0\\text{ kJ}$$",
        },
        {
          correct: true,
          label: "$$5.76\\text{ dm}^3$$ dan $$47.9\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$3.60\\text{ dm}^3$$ dan $$47.9\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$14.4\\text{ dm}^3$$ dan $$289.8\\text{ kJ}$$",
        },
      ],
    },
  },
};

export default item;
