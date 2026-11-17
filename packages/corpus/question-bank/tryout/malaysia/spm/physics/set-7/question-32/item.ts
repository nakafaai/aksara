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
          correct: false,
          label: "$$5.0\\text{ kW}$$, $$200\\text{ W}$$ and $$10\\text{ kV}$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ kW}$$, $$8.0\\text{ W}$$ and $$3.2\\text{ kV}$$",
        },
        {
          correct: false,
          label: "$$100\\text{ W}$$, $$4.0\\text{ W}$$ and $$0.20\\text{ kV}$$",
        },
        {
          correct: false,
          label: "$$2.5\\text{ kW}$$, $$4.0\\text{ W}$$ and $$2.2\\text{ kV}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5.0\\text{ kW}$$, $$200\\text{ W}$$ dan $$10\\text{ kV}$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ kW}$$, $$8.0\\text{ W}$$ dan $$3.2\\text{ kV}$$",
        },
        {
          correct: false,
          label: "$$100\\text{ W}$$, $$4.0\\text{ W}$$ dan $$0.20\\text{ kV}$$",
        },
        {
          correct: false,
          label: "$$2.5\\text{ kW}$$, $$4.0\\text{ W}$$ dan $$2.2\\text{ kV}$$",
        },
      ],
    },
  },
};

export default item;
