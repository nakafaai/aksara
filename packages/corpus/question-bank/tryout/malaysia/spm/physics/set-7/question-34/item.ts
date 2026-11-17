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
          correct: true,
          label: "$$46\\text{ W}$$, $$61\\text{ W}$$ and $$17:1$$",
        },
        {
          correct: false,
          label: "$$72\\text{ W}$$, $$72\\text{ W}$$ and $$20:1$$",
        },
        {
          correct: false,
          label: "$$46\\text{ W}$$, $$76\\text{ W}$$ and $$17:1$$",
        },
        {
          correct: false,
          label: "$$46\\text{ W}$$, $$61\\text{ W}$$ and $$22:1$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$46\\text{ W}$$, $$61\\text{ W}$$ dan $$17:1$$",
        },
        {
          correct: false,
          label: "$$72\\text{ W}$$, $$72\\text{ W}$$ dan $$20:1$$",
        },
        {
          correct: false,
          label: "$$46\\text{ W}$$, $$76\\text{ W}$$ dan $$17:1$$",
        },
        {
          correct: false,
          label: "$$46\\text{ W}$$, $$61\\text{ W}$$ dan $$22:1$$",
        },
      ],
    },
  },
};

export default item;
