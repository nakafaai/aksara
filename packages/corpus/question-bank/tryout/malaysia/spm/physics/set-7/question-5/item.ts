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
        { correct: false, label: "$$45\\text{ N}$$ and $$36\\%$$" },
        { correct: false, label: "$$5\\text{ N}$$ and $$20\\%$$" },
        { correct: false, label: "$$46\\text{ N}$$ and $$20\\%$$" },
        { correct: true, label: "$$46\\text{ N}$$ and $$36\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$45\\text{ N}$$ dan $$36\\%$$" },
        { correct: false, label: "$$5\\text{ N}$$ dan $$20\\%$$" },
        { correct: false, label: "$$46\\text{ N}$$ dan $$20\\%$$" },
        { correct: true, label: "$$46\\text{ N}$$ dan $$36\\%$$" },
      ],
    },
  },
};

export default item;
