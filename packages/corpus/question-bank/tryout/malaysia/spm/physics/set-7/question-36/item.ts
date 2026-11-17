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
            "$$23\\,\\mu\\text{A}$$, $$1.9\\text{ V}$$, $$225\\text{ k}\\Omega$$ and $$9.0\\text{ mA}$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$2.4\\text{ V}$$, $$200\\text{ k}\\Omega$$ and $$8.0\\text{ mA}$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$6.0\\text{ V}$$, $$1.3\\text{ k}\\Omega$$ and $$0.053\\text{ mA}$$",
        },
        {
          correct: true,
          label:
            "$$20\\,\\mu\\text{A}$$, $$2.4\\text{ V}$$, $$200\\text{ k}\\Omega$$ and $$5.0\\text{ mA}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$23\\,\\mu\\text{A}$$, $$1.9\\text{ V}$$, $$225\\text{ k}\\Omega$$ dan $$9.0\\text{ mA}$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$2.4\\text{ V}$$, $$200\\text{ k}\\Omega$$ dan $$8.0\\text{ mA}$$",
        },
        {
          correct: false,
          label:
            "$$20\\,\\mu\\text{A}$$, $$6.0\\text{ V}$$, $$1.3\\text{ k}\\Omega$$ dan $$0.053\\text{ mA}$$",
        },
        {
          correct: true,
          label:
            "$$20\\,\\mu\\text{A}$$, $$2.4\\text{ V}$$, $$200\\text{ k}\\Omega$$ dan $$5.0\\text{ mA}$$",
        },
      ],
    },
  },
};

export default item;
