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
          label:
            "$$23\\,\\mu\\text{A}$$, $$1.9\\text{ V}$$ and $$225\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$3.6\\text{ V}$$ and $$200\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$6.0\\text{ V}$$ and $$1.3\\text{ k}\\Omega$$",
        },
        {
          correct: true,
          label:
            "$$20\\,\\mu\\text{A}$$, $$2.4\\text{ V}$$ and $$200\\text{ k}\\Omega$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$23\\,\\mu\\text{A}$$, $$1.9\\text{ V}$$ dan $$225\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$3.6\\text{ V}$$ dan $$200\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$6.0\\text{ V}$$ dan $$1.3\\text{ k}\\Omega$$",
        },
        {
          correct: true,
          label:
            "$$20\\,\\mu\\text{A}$$, $$2.4\\text{ V}$$ dan $$200\\text{ k}\\Omega$$",
        },
      ],
    },
  },
};

export default item;
