import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cell-division",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6\\text{ pg}$$ and $$3\\text{ pg}$$" },
        { correct: false, label: "$$24\\text{ pg}$$ and $$12\\text{ pg}$$" },
        { correct: true, label: "$$12\\text{ pg}$$ and $$6\\text{ pg}$$" },
        { correct: false, label: "$$12\\text{ pg}$$ and $$12\\text{ pg}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6\\text{ pg}$$ dan $$3\\text{ pg}$$" },
        { correct: false, label: "$$24\\text{ pg}$$ dan $$12\\text{ pg}$$" },
        { correct: true, label: "$$12\\text{ pg}$$ dan $$6\\text{ pg}$$" },
        { correct: false, label: "$$12\\text{ pg}$$ dan $$12\\text{ pg}$$" },
      ],
    },
  },
};

export default item;
