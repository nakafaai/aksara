import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.67\\text{ m s}^{-1}$$, $$200\\text{ kJ}$$ and $$100\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$6.67\\text{ m s}^{-1}$$, $$133\\text{ kJ}$$ and $$66.7\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ m s}^{-1}$$, $$300\\text{ kJ}$$ and $$150\\text{ A}$$",
        },
        {
          correct: true,
          label:
            "$$6.67\\text{ m s}^{-1}$$, $$167\\text{ kJ}$$ and $$83.3\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.67\\text{ m s}^{-1}$$, $$200\\text{ kJ}$$ dan $$100\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$6.67\\text{ m s}^{-1}$$, $$133\\text{ kJ}$$ dan $$66.7\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ m s}^{-1}$$, $$300\\text{ kJ}$$ dan $$150\\text{ A}$$",
        },
        {
          correct: true,
          label:
            "$$6.67\\text{ m s}^{-1}$$, $$167\\text{ kJ}$$ dan $$83.3\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
