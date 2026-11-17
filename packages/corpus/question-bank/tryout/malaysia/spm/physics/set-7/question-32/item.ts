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
        { correct: false, label: "$$5.0\\text{ kW}$$ and $$200\\text{ W}$$" },
        { correct: true, label: "$$5.0\\text{ kW}$$ and $$8.0\\text{ W}$$" },
        { correct: false, label: "$$100\\text{ W}$$ and $$4.0\\text{ W}$$" },
        { correct: false, label: "$$2.5\\text{ kW}$$ and $$4.0\\text{ W}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$5.0\\text{ kW}$$ dan $$200\\text{ W}$$" },
        { correct: true, label: "$$5.0\\text{ kW}$$ dan $$8.0\\text{ W}$$" },
        { correct: false, label: "$$100\\text{ W}$$ dan $$4.0\\text{ W}$$" },
        { correct: false, label: "$$2.5\\text{ kW}$$ dan $$4.0\\text{ W}$$" },
      ],
    },
  },
};

export default item;
