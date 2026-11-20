import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.21\\text{ kW}$$, $$0\\text{ A}$$ and $$0\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$2.21\\text{ kW}$$, $$15.0\\,\\mu\\text{A}$$ and $$3.00\\text{ mA}$$",
        },
        {
          correct: true,
          label:
            "$$2.21\\text{ kW}$$, $$15.0\\,\\mu\\text{A}$$ and $$0\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$2.21\\text{ kW}$$, $$4.6\\text{ mA}$$ and $$0\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.21\\text{ kW}$$, $$0\\text{ A}$$ dan $$0\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$2.21\\text{ kW}$$, $$15.0\\,\\mu\\text{A}$$ dan $$3.00\\text{ mA}$$",
        },
        {
          correct: true,
          label:
            "$$2.21\\text{ kW}$$, $$15.0\\,\\mu\\text{A}$$ dan $$0\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$2.21\\text{ kW}$$, $$4.6\\text{ mA}$$ dan $$0\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
