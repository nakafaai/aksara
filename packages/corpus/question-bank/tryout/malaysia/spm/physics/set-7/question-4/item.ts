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
        { correct: false, label: "$$10\\text{ N}$$ and $$60\\text{ N}$$" },
        { correct: true, label: "$$50\\text{ N}$$ and $$120\\text{ N}$$" },
        { correct: false, label: "$$50\\text{ N}$$ and $$60\\text{ N}$$" },
        { correct: false, label: "$$30\\text{ N}$$ and $$120\\text{ N}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10\\text{ N}$$ dan $$60\\text{ N}$$" },
        { correct: true, label: "$$50\\text{ N}$$ dan $$120\\text{ N}$$" },
        { correct: false, label: "$$50\\text{ N}$$ dan $$60\\text{ N}$$" },
        { correct: false, label: "$$30\\text{ N}$$ dan $$120\\text{ N}$$" },
      ],
    },
  },
};

export default item;
