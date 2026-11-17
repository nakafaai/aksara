import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$50\\text{ N}$$ and $$80\\text{ N}$$" },
        { correct: false, label: "$$40\\text{ N}$$ and $$100\\text{ N}$$" },
        { correct: true, label: "$$67\\text{ N}$$ and $$60\\text{ N}$$" },
        { correct: false, label: "$$67\\text{ N}$$ and $$100\\text{ N}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$50\\text{ N}$$ dan $$80\\text{ N}$$" },
        { correct: false, label: "$$40\\text{ N}$$ dan $$100\\text{ N}$$" },
        { correct: true, label: "$$67\\text{ N}$$ dan $$60\\text{ N}$$" },
        { correct: false, label: "$$67\\text{ N}$$ dan $$100\\text{ N}$$" },
      ],
    },
  },
};

export default item;
