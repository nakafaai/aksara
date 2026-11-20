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
            "$$12\\text{ cm}$$, the reading at $$u=30\\text{ cm}$$, and between $$12\\text{ cm}$$ and $$24\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$12\\text{ cm}$$, the reading at $$u=15\\text{ cm}$$, and between $$15\\text{ cm}$$ and $$24\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$12\\text{ cm}$$, the reading at $$u=30\\text{ cm}$$, and between $$15\\text{ cm}$$ and $$24\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$12\\text{ cm}$$, the reading at $$u=30\\text{ cm}$$, and between $$15\\text{ cm}$$ and $$40\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$12\\text{ cm}$$, bacaan pada $$u=30\\text{ cm}$$, dan antara $$12\\text{ cm}$$ hingga $$24\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$12\\text{ cm}$$, bacaan pada $$u=15\\text{ cm}$$, dan antara $$15\\text{ cm}$$ hingga $$24\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$12\\text{ cm}$$, bacaan pada $$u=30\\text{ cm}$$, dan antara $$15\\text{ cm}$$ hingga $$24\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$12\\text{ cm}$$, bacaan pada $$u=30\\text{ cm}$$, dan antara $$15\\text{ cm}$$ hingga $$40\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
