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
        {
          correct: true,
          label: "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$ and $$3.9\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-2$$, $$7.8\\text{ g s}^{-1}$$ and $$4.6\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$ and $$1.0\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-3$$, $$20\\text{ g s}^{-1}$$ and $$3.5\\text{ mm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$ dan $$3.9\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-2$$, $$7.8\\text{ g s}^{-1}$$ dan $$4.6\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$ dan $$1.0\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-3$$, $$20\\text{ g s}^{-1}$$ dan $$3.5\\text{ mm}$$",
        },
      ],
    },
  },
};

export default item;
