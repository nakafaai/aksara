import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$16.3\\text{ V}$$, $$100\\text{ Hz}$$ and $$0.16\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$15.6\\text{ V}$$, $$50\\text{ Hz}$$ and $$0.16\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$10.6\\text{ V}$$, $$100\\text{ Hz}$$ and $$0.11\\text{ A}$$",
        },
        {
          correct: true,
          label:
            "$$15.6\\text{ V}$$, $$100\\text{ Hz}$$ and $$0.16\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$16.3\\text{ V}$$, $$100\\text{ Hz}$$ dan $$0.16\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$15.6\\text{ V}$$, $$50\\text{ Hz}$$ dan $$0.16\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$10.6\\text{ V}$$, $$100\\text{ Hz}$$ dan $$0.11\\text{ A}$$",
        },
        {
          correct: true,
          label:
            "$$15.6\\text{ V}$$, $$100\\text{ Hz}$$ dan $$0.16\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
