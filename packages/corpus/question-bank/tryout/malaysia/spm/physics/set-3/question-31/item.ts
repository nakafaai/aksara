import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.33\\text{ A}$$; $$6.0\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$0.30\\text{ A}$$; $$6.0\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$0.27\\text{ A}$$; $$6.0\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$0.33\\text{ A}$$; $$2.0\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.33\\text{ A}$$; $$6.0\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$0.30\\text{ A}$$; $$6.0\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$0.27\\text{ A}$$; $$6.0\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$0.33\\text{ A}$$; $$2.0\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
