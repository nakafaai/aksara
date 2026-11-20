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
          label: "$$160$$, $$0.13\\text{ A}$$ and $$75\\%$$",
        },
        {
          correct: false,
          label: "$$160$$, $$0.12\\text{ A}$$ and $$84\\%$$",
        },
        {
          correct: false,
          label: "$$160$$, $$0.21\\text{ A}$$ and $$48\\%$$",
        },
        {
          correct: false,
          label: "$$36\\,000$$, $$0.13\\text{ A}$$ and $$75\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$160$$, $$0.13\\text{ A}$$ dan $$75\\%$$",
        },
        {
          correct: false,
          label: "$$160$$, $$0.12\\text{ A}$$ dan $$84\\%$$",
        },
        {
          correct: false,
          label: "$$160$$, $$0.21\\text{ A}$$ dan $$48\\%$$",
        },
        {
          correct: false,
          label: "$$36\\,000$$, $$0.13\\text{ A}$$ dan $$75\\%$$",
        },
      ],
    },
  },
};

export default item;
