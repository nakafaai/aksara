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
          label: "$$5.0\\text{ kW}$$, $$200\\text{ W}$$ and $$900\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ kW}$$, $$8.0\\text{ W}$$ and $$900\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$100\\text{ W}$$, $$4.0\\text{ W}$$ and $$900\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$2.5\\text{ kW}$$, $$4.0\\text{ W}$$ and $$950\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5.0\\text{ kW}$$, $$200\\text{ W}$$ dan $$900\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ kW}$$, $$8.0\\text{ W}$$ dan $$900\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$100\\text{ W}$$, $$4.0\\text{ W}$$ dan $$900\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$2.5\\text{ kW}$$, $$4.0\\text{ W}$$ dan $$950\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
