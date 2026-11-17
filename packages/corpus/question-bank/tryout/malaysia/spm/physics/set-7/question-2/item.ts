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
          label:
            "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$, $$\\times1.32$$ and $$5.7\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$n=-2$$, $$7.8\\text{ g s}^{-1}$$, $$\\times1.41$$ and $$6.4\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$, $$\\times2.0$$ and $$5.7\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$n=-3$$, $$20\\text{ g s}^{-1}$$, $$\\times1.26$$ and $$5.1\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$, $$\\times1.32$$ dan $$5.7\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$n=-2$$, $$7.8\\text{ g s}^{-1}$$, $$\\times1.41$$ dan $$6.4\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$n=-2.5$$, $$12.5\\text{ g s}^{-1}$$, $$\\times2.0$$ dan $$5.7\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$n=-3$$, $$20\\text{ g s}^{-1}$$, $$\\times1.26$$ dan $$5.1\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
