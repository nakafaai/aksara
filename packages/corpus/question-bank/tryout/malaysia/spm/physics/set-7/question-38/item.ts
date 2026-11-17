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
          label: "beta, $$6.0\\text{ h}$$ and $$30\\text{ h}$$",
        },
        {
          correct: true,
          label: "gamma, $$6.0\\text{ h}$$ and $$30\\text{ h}$$",
        },
        {
          correct: false,
          label: "gamma, $$6.8\\text{ h}$$ and $$26\\text{ h}$$",
        },
        {
          correct: false,
          label: "gamma, $$6.0\\text{ h}$$ and $$23\\text{ h}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "beta, $$6.0\\text{ j}$$ dan $$30\\text{ j}$$",
        },
        {
          correct: true,
          label: "gama, $$6.0\\text{ j}$$ dan $$30\\text{ j}$$",
        },
        {
          correct: false,
          label: "gama, $$6.8\\text{ j}$$ dan $$26\\text{ j}$$",
        },
        {
          correct: false,
          label: "gama, $$6.0\\text{ j}$$ dan $$23\\text{ j}$$",
        },
      ],
    },
  },
};

export default item;
