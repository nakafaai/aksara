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
          label: "$$240\\text{ V}$$, $$38$$ and $$0.69\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$340\\text{ V}$$, $$27$$ and $$0.56\\text{ A}$$",
        },
        {
          correct: true,
          label: "$$340\\text{ V}$$, $$27$$ and $$0.69\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$170\\text{ V}$$, $$53$$ and $$0.69\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$240\\text{ V}$$, $$38$$ dan $$0.69\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$340\\text{ V}$$, $$27$$ dan $$0.56\\text{ A}$$",
        },
        {
          correct: true,
          label: "$$340\\text{ V}$$, $$27$$ dan $$0.69\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$170\\text{ V}$$, $$53$$ dan $$0.69\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
