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
          label: "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$ and $$\\times1.32$$",
        },
        {
          correct: false,
          label: "$$n=-2$$, $$7.8\\text{ g s}^{-1}$$ and $$\\times1.41$$",
        },
        {
          correct: false,
          label: "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$ and $$\\times2.0$$",
        },
        {
          correct: false,
          label: "$$n=-3$$, $$20\\text{ g s}^{-1}$$ and $$\\times1.26$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$ dan $$\\times1.32$$",
        },
        {
          correct: false,
          label: "$$n=-2$$, $$7.8\\text{ g s}^{-1}$$ dan $$\\times1.41$$",
        },
        {
          correct: false,
          label: "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$ dan $$\\times2.0$$",
        },
        {
          correct: false,
          label: "$$n=-3$$, $$20\\text{ g s}^{-1}$$ dan $$\\times1.26$$",
        },
      ],
    },
  },
};

export default item;
