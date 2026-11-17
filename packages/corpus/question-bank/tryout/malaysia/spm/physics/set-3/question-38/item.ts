import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$800\\text{ MBq}$$, and between $$30\\text{ h}$$ and $$36\\text{ h}$$",
        },
        {
          correct: false,
          label:
            "$$1200\\text{ MBq}$$, and between $$30\\text{ h}$$ and $$36\\text{ h}$$",
        },
        {
          correct: true,
          label:
            "$$1130\\text{ MBq}$$, and between $$30\\text{ h}$$ and $$36\\text{ h}$$",
        },
        {
          correct: false,
          label:
            "$$1130\\text{ MBq}$$, and between $$24\\text{ h}$$ and $$30\\text{ h}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$800\\text{ MBq}$$, dan antara $$30\\text{ j}$$ dengan $$36\\text{ j}$$",
        },
        {
          correct: false,
          label:
            "$$1200\\text{ MBq}$$, dan antara $$30\\text{ j}$$ dengan $$36\\text{ j}$$",
        },
        {
          correct: true,
          label:
            "$$1130\\text{ MBq}$$, dan antara $$30\\text{ j}$$ dengan $$36\\text{ j}$$",
        },
        {
          correct: false,
          label:
            "$$1130\\text{ MBq}$$, dan antara $$24\\text{ j}$$ dengan $$30\\text{ j}$$",
        },
      ],
    },
  },
};

export default item;
