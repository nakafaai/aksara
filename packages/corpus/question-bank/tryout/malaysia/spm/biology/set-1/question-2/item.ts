import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cell-biology-and-organisation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$50\\,\\mu\\text{m}$$, $$32$$ cells",
        },
        {
          correct: false,
          label: "$$50\\,\\mu\\text{m}$$, $$128$$ cells",
        },
        {
          correct: false,
          label: "$$50\\,\\mu\\text{m}$$, $$2$$ cells",
        },
        {
          correct: false,
          label: "$$20\\,\\mu\\text{m}$$, $$32$$ cells",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$50\\,\\mu\\text{m}$$, $$32$$ sel",
        },
        {
          correct: false,
          label: "$$50\\,\\mu\\text{m}$$, $$128$$ sel",
        },
        {
          correct: false,
          label: "$$50\\,\\mu\\text{m}$$, $$2$$ sel",
        },
        {
          correct: false,
          label: "$$20\\,\\mu\\text{m}$$, $$32$$ sel",
        },
      ],
    },
  },
};

export default item;
