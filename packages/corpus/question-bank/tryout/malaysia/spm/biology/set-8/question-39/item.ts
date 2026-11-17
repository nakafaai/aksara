import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "genetic-technology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5\\text{ kb}$$ and $$8\\text{ kb}$$ from end L",
        },
        {
          correct: false,
          label: "$$2\\text{ kb}$$ and $$7\\text{ kb}$$ from end L",
        },
        {
          correct: true,
          label: "$$2\\text{ kb}$$ and $$5\\text{ kb}$$ from end L",
        },
        {
          correct: false,
          label: "$$5\\text{ kb}$$ and $$7\\text{ kb}$$ from end L",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5\\text{ kb}$$ dan $$8\\text{ kb}$$ dari hujung L",
        },
        {
          correct: false,
          label: "$$2\\text{ kb}$$ dan $$7\\text{ kb}$$ dari hujung L",
        },
        {
          correct: true,
          label: "$$2\\text{ kb}$$ dan $$5\\text{ kb}$$ dari hujung L",
        },
        {
          correct: false,
          label: "$$5\\text{ kb}$$ dan $$7\\text{ kb}$$ dari hujung L",
        },
      ],
    },
  },
};

export default item;
