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
        { correct: false, label: "$$1$$ turn, then $$8.0\\text{ kW}$$" },
        { correct: false, label: "$$51$$ turns, then $$1.6\\text{ kW}$$" },
        { correct: true, label: "$$51$$ turns, then $$3.1\\text{ kW}$$" },
        { correct: false, label: "$$51$$ turns, then $$2.5\\text{ kW}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1$$ lilitan, kemudian $$8.0\\text{ kW}$$" },
        {
          correct: false,
          label: "$$51$$ lilitan, kemudian $$1.6\\text{ kW}$$",
        },
        { correct: true, label: "$$51$$ lilitan, kemudian $$3.1\\text{ kW}$$" },
        {
          correct: false,
          label: "$$51$$ lilitan, kemudian $$2.5\\text{ kW}$$",
        },
      ],
    },
  },
};

export default item;
