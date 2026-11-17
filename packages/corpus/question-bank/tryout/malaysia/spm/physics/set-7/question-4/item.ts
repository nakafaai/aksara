import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$30\\text{ N}$$, $$100\\%$$ and $$0.26\\text{ A}$$",
        },
        {
          correct: true,
          label: "$$30\\text{ N}$$, $$50\\%$$ and $$0.26\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$15\\text{ N}$$, $$100\\%$$ and $$0.13\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ N}$$, $$50\\%$$ and $$0.20\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$30\\text{ N}$$, $$100\\%$$ dan $$0.26\\text{ A}$$",
        },
        {
          correct: true,
          label: "$$30\\text{ N}$$, $$50\\%$$ dan $$0.26\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$15\\text{ N}$$, $$100\\%$$ dan $$0.13\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ N}$$, $$50\\%$$ dan $$0.20\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
