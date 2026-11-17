import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$n=-2.5$$ and $$32\\text{ s}$$" },
        { correct: false, label: "$$n=-2$$ and $$51\\text{ s}$$" },
        { correct: false, label: "$$n=-2.5$$ and $$45\\text{ s}$$" },
        { correct: false, label: "$$n=-3$$ and $$20\\text{ s}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$n=-2.5$$ dan $$32\\text{ s}$$" },
        { correct: false, label: "$$n=-2$$ dan $$51\\text{ s}$$" },
        { correct: false, label: "$$n=-2.5$$ dan $$45\\text{ s}$$" },
        { correct: false, label: "$$n=-3$$ dan $$20\\text{ s}$$" },
      ],
    },
  },
};

export default item;
