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
          label: "$$20:1$$ and $$0.125\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$20:1$$ and $$0.10\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$1:20$$ and $$0.125\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$20:1$$ and $$0.080\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$20:1$$ dan $$0.125\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$20:1$$ dan $$0.10\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$1:20$$ dan $$0.125\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$20:1$$ dan $$0.080\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
