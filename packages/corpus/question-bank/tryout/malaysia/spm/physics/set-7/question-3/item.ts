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
        { correct: false, label: "$$24\\text{ s}$$ and $$20\\text{ s}$$" },
        { correct: false, label: "$$50\\text{ s}$$ and $$120\\text{ s}$$" },
        { correct: true, label: "$$24\\text{ s}$$ and $$120\\text{ s}$$" },
        { correct: false, label: "$$20\\text{ s}$$ and $$100\\text{ s}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$24\\text{ s}$$ dan $$20\\text{ s}$$" },
        { correct: false, label: "$$50\\text{ s}$$ dan $$120\\text{ s}$$" },
        { correct: true, label: "$$24\\text{ s}$$ dan $$120\\text{ s}$$" },
        { correct: false, label: "$$20\\text{ s}$$ dan $$100\\text{ s}$$" },
      ],
    },
  },
};

export default item;
