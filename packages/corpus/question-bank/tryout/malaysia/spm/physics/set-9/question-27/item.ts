import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.8\\text{ kPa}$$, and $$18\\text{ cm}$$, with the open arm higher",
        },
        {
          correct: true,
          label:
            "$$1.8\\text{ kPa}$$, and $$15\\text{ cm}$$, with the open arm higher",
        },
        {
          correct: false,
          label:
            "$$1.8\\text{ kPa}$$, and $$15\\text{ cm}$$, with the flask arm higher",
        },
        {
          correct: false,
          label:
            "$$1.8\\text{ kPa}$$, and $$21\\text{ cm}$$, with the open arm higher",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.8\\text{ kPa}$$, dan $$18\\text{ cm}$$, dengan lengan terbuka lebih tinggi",
        },
        {
          correct: true,
          label:
            "$$1.8\\text{ kPa}$$, dan $$15\\text{ cm}$$, dengan lengan terbuka lebih tinggi",
        },
        {
          correct: false,
          label:
            "$$1.8\\text{ kPa}$$, dan $$15\\text{ cm}$$, dengan lengan kelalang lebih tinggi",
        },
        {
          correct: false,
          label:
            "$$1.8\\text{ kPa}$$, dan $$21\\text{ cm}$$, dengan lengan terbuka lebih tinggi",
        },
      ],
    },
  },
};

export default item;
