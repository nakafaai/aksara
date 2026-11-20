import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.3\\text{ min}$$, $$19\\text{ min}$$ and $$0.84\\text{ kW h}$$",
        },
        {
          correct: true,
          label:
            "$$6.7\\text{ min}$$, $$19\\text{ min}$$ and $$0.85\\text{ kW h}$$",
        },
        {
          correct: false,
          label:
            "$$6.7\\text{ min}$$, $$12\\text{ min}$$ and $$0.62\\text{ kW h}$$",
        },
        {
          correct: false,
          label:
            "$$6.7\\text{ min}$$, $$19\\text{ min}$$ and $$0.68\\text{ kW h}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.3\\text{ min}$$, $$19\\text{ min}$$ dan $$0.84\\text{ kW j}$$",
        },
        {
          correct: true,
          label:
            "$$6.7\\text{ min}$$, $$19\\text{ min}$$ dan $$0.85\\text{ kW j}$$",
        },
        {
          correct: false,
          label:
            "$$6.7\\text{ min}$$, $$12\\text{ min}$$ dan $$0.62\\text{ kW j}$$",
        },
        {
          correct: false,
          label:
            "$$6.7\\text{ min}$$, $$19\\text{ min}$$ dan $$0.68\\text{ kW j}$$",
        },
      ],
    },
  },
};

export default item;
