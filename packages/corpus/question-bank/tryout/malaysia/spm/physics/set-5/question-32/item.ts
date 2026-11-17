import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3.0\\text{ A}$$, or move the rider to $$6.7\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1.3\\text{ A}$$, or move the rider to $$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ A}$$, or move the rider to $$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ A}$$, or move the rider to $$4.4\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$3.0\\text{ A}$$, atau alihkan penunggang ke $$6.7\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$1.3\\text{ A}$$, atau alihkan penunggang ke $$15\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$3.0\\text{ A}$$, atau alihkan penunggang ke $$15\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$3.0\\text{ A}$$, atau alihkan penunggang ke $$4.4\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
