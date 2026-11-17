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
        { correct: false, label: "$$30\\text{ N}$$ and $$100\\%$$" },
        { correct: true, label: "$$30\\text{ N}$$ and $$50\\%$$" },
        { correct: false, label: "$$15\\text{ N}$$ and $$100\\%$$" },
        { correct: false, label: "$$200\\text{ N}$$ and $$50\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$30\\text{ N}$$ dan $$100\\%$$" },
        { correct: true, label: "$$30\\text{ N}$$ dan $$50\\%$$" },
        { correct: false, label: "$$15\\text{ N}$$ dan $$100\\%$$" },
        { correct: false, label: "$$200\\text{ N}$$ dan $$50\\%$$" },
      ],
    },
  },
};

export default item;
