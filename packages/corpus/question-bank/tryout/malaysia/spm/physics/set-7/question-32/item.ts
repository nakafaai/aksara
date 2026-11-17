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
          label: "$$5.0\\text{ kW}$$, $$200\\text{ W}$$ and $$3.75:1$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ kW}$$, $$8.0\\text{ W}$$ and $$3.75:1$$",
        },
        {
          correct: false,
          label: "$$100\\text{ W}$$, $$4.0\\text{ W}$$ and $$3.75:1$$",
        },
        {
          correct: false,
          label: "$$5.0\\text{ kW}$$, $$8.0\\text{ W}$$ and $$4.2:1$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5.0\\text{ kW}$$, $$200\\text{ W}$$ dan $$3.75:1$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ kW}$$, $$8.0\\text{ W}$$ dan $$3.75:1$$",
        },
        {
          correct: false,
          label: "$$100\\text{ W}$$, $$4.0\\text{ W}$$ dan $$3.75:1$$",
        },
        {
          correct: false,
          label: "$$5.0\\text{ kW}$$, $$8.0\\text{ W}$$ dan $$4.2:1$$",
        },
      ],
    },
  },
};

export default item;
