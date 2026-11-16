import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{Cu(NO}_3)_2\\cdot3\\text{H}_2\\text{O}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Cu(NO}_3)_2\\cdot3\\text{H}_2\\text{O}$$, $$1320\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{Cu(NO}_3)_2$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$\\text{Cu(NO}_3)_2\\cdot3\\text{H}_2\\text{O}$$, $$600\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{Cu(NO}_3)_2\\cdot3\\text{H}_2\\text{O}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{Cu(NO}_3)_2\\cdot3\\text{H}_2\\text{O}$$, $$1320\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{Cu(NO}_3)_2$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$\\text{Cu(NO}_3)_2\\cdot3\\text{H}_2\\text{O}$$, $$600\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
