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
          label: "$$5.0\\text{ m}$$, $$6.0\\text{ cm}^3$$ and $$\\times1.4$$",
        },
        {
          correct: false,
          label: "$$26\\text{ m}$$, $$23\\text{ cm}^3$$ and $$\\times2.3$$",
        },
        {
          correct: true,
          label: "$$5.5\\text{ m}$$, $$6.4\\text{ cm}^3$$ and $$\\times1.5$$",
        },
        {
          correct: false,
          label: "$$10\\text{ m}$$, $$4.3\\text{ cm}^3$$ and $$\\times1.3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5.0\\text{ m}$$, $$6.0\\text{ cm}^3$$ dan $$\\times1.4$$",
        },
        {
          correct: false,
          label: "$$26\\text{ m}$$, $$23\\text{ cm}^3$$ dan $$\\times2.3$$",
        },
        {
          correct: true,
          label: "$$5.5\\text{ m}$$, $$6.4\\text{ cm}^3$$ dan $$\\times1.5$$",
        },
        {
          correct: false,
          label: "$$10\\text{ m}$$, $$4.3\\text{ cm}^3$$ dan $$\\times1.3$$",
        },
      ],
    },
  },
};

export default item;
