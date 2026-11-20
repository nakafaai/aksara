import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$, it stays at $$30\\text{ cm}$$, and $$150\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$15\\text{ cm}$$, it moves $$10\\text{ cm}$$ further away, and $$37.5\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$15\\text{ cm}$$, it stays at $$15\\text{ cm}$$, and $$37.5\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$15\\text{ cm}$$, it stays at $$15\\text{ cm}$$, and $$9.4\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$, ia kekal pada $$30\\text{ cm}$$, dan $$150\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$15\\text{ cm}$$, ia beralih $$10\\text{ cm}$$ lebih jauh, dan $$37.5\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$15\\text{ cm}$$, ia kekal pada $$15\\text{ cm}$$, dan $$37.5\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$15\\text{ cm}$$, ia kekal pada $$15\\text{ cm}$$, dan $$9.4\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
