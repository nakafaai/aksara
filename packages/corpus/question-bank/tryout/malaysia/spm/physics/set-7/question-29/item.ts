import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$576\\text{ W}$$ and $$10\\text{ A}$$" },
        { correct: false, label: "$$960\\text{ W}$$ and $$10\\text{ A}$$" },
        { correct: false, label: "$$576\\text{ W}$$ and $$2.4\\text{ A}$$" },
        { correct: false, label: "$$1440\\text{ W}$$ and $$6.0\\text{ A}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$576\\text{ W}$$ dan $$10\\text{ A}$$" },
        { correct: false, label: "$$960\\text{ W}$$ dan $$10\\text{ A}$$" },
        { correct: false, label: "$$576\\text{ W}$$ dan $$2.4\\text{ A}$$" },
        { correct: false, label: "$$1440\\text{ W}$$ dan $$6.0\\text{ A}$$" },
      ],
    },
  },
};

export default item;
