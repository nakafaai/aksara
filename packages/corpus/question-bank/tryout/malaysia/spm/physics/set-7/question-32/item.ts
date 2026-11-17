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
          label: "$$49\\text{ kW}$$, $$8.3\\%$$ and $$6.5\\text{ W}$$",
        },
        {
          correct: true,
          label: "$$50\\text{ kW}$$, $$10\\%$$ and $$6.5\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$450\\text{ kW}$$, $$90\\%$$ and $$6.5\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$50\\text{ kW}$$, $$10\\%$$ and $$200\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$49\\text{ kW}$$, $$8.3\\%$$ dan $$6.5\\text{ W}$$",
        },
        {
          correct: true,
          label: "$$50\\text{ kW}$$, $$10\\%$$ dan $$6.5\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$450\\text{ kW}$$, $$90\\%$$ dan $$6.5\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$50\\text{ kW}$$, $$10\\%$$ dan $$200\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
