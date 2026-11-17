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
            "beta, $$6.0\\text{ h}$$, $$30\\text{ h}$$ and $$280$$ per minute",
        },
        {
          correct: true,
          label:
            "gamma, $$6.0\\text{ h}$$, $$30\\text{ h}$$ and $$280$$ per minute",
        },
        {
          correct: false,
          label:
            "gamma, $$6.8\\text{ h}$$, $$26\\text{ h}$$ and $$250$$ per minute",
        },
        {
          correct: false,
          label:
            "gamma, $$6.0\\text{ h}$$, $$23\\text{ h}$$ and $$240$$ per minute",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "beta, $$6.0\\text{ j}$$, $$30\\text{ j}$$ dan $$280$$ per minit",
        },
        {
          correct: true,
          label:
            "gama, $$6.0\\text{ j}$$, $$30\\text{ j}$$ dan $$280$$ per minit",
        },
        {
          correct: false,
          label:
            "gama, $$6.8\\text{ j}$$, $$26\\text{ j}$$ dan $$250$$ per minit",
        },
        {
          correct: false,
          label:
            "gama, $$6.0\\text{ j}$$, $$23\\text{ j}$$ dan $$240$$ per minit",
        },
      ],
    },
  },
};

export default item;
