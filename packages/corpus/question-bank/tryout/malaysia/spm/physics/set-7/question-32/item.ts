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
          label: "$$5.0\\text{ kW}$$, $$200\\text{ W}$$ and $$90\\%$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ kW}$$, $$8.0\\text{ W}$$ and $$90\\%$$",
        },
        {
          correct: false,
          label: "$$100\\text{ W}$$, $$4.0\\text{ W}$$ and $$99.8\\%$$",
        },
        {
          correct: false,
          label: "$$2.5\\text{ kW}$$, $$4.0\\text{ W}$$ and $$95\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5.0\\text{ kW}$$, $$200\\text{ W}$$ dan $$90\\%$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ kW}$$, $$8.0\\text{ W}$$ dan $$90\\%$$",
        },
        {
          correct: false,
          label: "$$100\\text{ W}$$, $$4.0\\text{ W}$$ dan $$99.8\\%$$",
        },
        {
          correct: false,
          label: "$$2.5\\text{ kW}$$, $$4.0\\text{ W}$$ dan $$95\\%$$",
        },
      ],
    },
  },
};

export default item;
