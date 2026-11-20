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
          label: "$$87$$ °C, $$31\\text{ cm}^3$$ and $$30\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$87$$ °C, $$37\\text{ cm}^3$$ and $$30\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$87$$ °C, $$31\\text{ cm}^3$$ and $$31\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$32$$ °C, $$31\\text{ cm}^3$$ and $$30\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$87$$ °C, $$31\\text{ cm}^3$$ dan $$30\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$87$$ °C, $$37\\text{ cm}^3$$ dan $$30\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$87$$ °C, $$31\\text{ cm}^3$$ dan $$31\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$32$$ °C, $$31\\text{ cm}^3$$ dan $$30\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
