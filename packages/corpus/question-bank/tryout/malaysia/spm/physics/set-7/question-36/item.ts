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
            "$$23\\,\\mu\\text{A}$$, $$1.9\\text{ V}$$, $$225\\text{ k}\\Omega$$ and $$4.8\\text{ mW}$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$3.6\\text{ V}$$, $$200\\text{ k}\\Omega$$ and $$4.8\\text{ mW}$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$6.0\\text{ V}$$, $$1.3\\text{ k}\\Omega$$ and $$24\\text{ mW}$$",
        },
        {
          correct: true,
          label:
            "$$20\\,\\mu\\text{A}$$, $$2.4\\text{ V}$$, $$200\\text{ k}\\Omega$$ and $$4.8\\text{ mW}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$23\\,\\mu\\text{A}$$, $$1.9\\text{ V}$$, $$225\\text{ k}\\Omega$$ dan $$4.8\\text{ mW}$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$3.6\\text{ V}$$, $$200\\text{ k}\\Omega$$ dan $$4.8\\text{ mW}$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$6.0\\text{ V}$$, $$1.3\\text{ k}\\Omega$$ dan $$24\\text{ mW}$$",
        },
        {
          correct: true,
          label:
            "$$20\\,\\mu\\text{A}$$, $$2.4\\text{ V}$$, $$200\\text{ k}\\Omega$$ dan $$4.8\\text{ mW}$$",
        },
      ],
    },
  },
};

export default item;
