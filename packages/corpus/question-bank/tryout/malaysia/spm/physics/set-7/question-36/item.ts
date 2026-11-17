import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$23\\,\\mu\\text{A}$$ and $$1.9\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$20\\,\\mu\\text{A}$$ and $$3.6\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$20\\,\\mu\\text{A}$$ and $$6.0\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$20\\,\\mu\\text{A}$$ and $$2.4\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$23\\,\\mu\\text{A}$$ dan $$1.9\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$20\\,\\mu\\text{A}$$ dan $$3.6\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$20\\,\\mu\\text{A}$$ dan $$6.0\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$20\\,\\mu\\text{A}$$ dan $$2.4\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
