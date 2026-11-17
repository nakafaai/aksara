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
          label: "$$6.0\\text{ cm}^3$$, radius $$\\times1.4$$",
        },
        { correct: false, label: "$$23\\text{ cm}^3$$, radius $$\\times2.3$$" },
        { correct: true, label: "$$6.4\\text{ cm}^3$$, radius $$\\times1.5$$" },
        {
          correct: false,
          label: "$$4.3\\text{ cm}^3$$, radius $$\\times1.3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6.0\\text{ cm}^3$$, jejari $$\\times1.4$$",
        },
        { correct: false, label: "$$23\\text{ cm}^3$$, jejari $$\\times2.3$$" },
        { correct: true, label: "$$6.4\\text{ cm}^3$$, jejari $$\\times1.5$$" },
        {
          correct: false,
          label: "$$4.3\\text{ cm}^3$$, jejari $$\\times1.3$$",
        },
      ],
    },
  },
};

export default item;
