import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$6.3\\text{ m s}^{-1}$$, $$5.0\\times10^{4}\\text{ Pa}$$ and $$8.0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.3\\text{ m s}^{-1}$$, $$7.0\\times10^{4}\\text{ Pa}$$ and $$10\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.3\\text{ m s}^{-1}$$, $$5.0\\times10^{4}\\text{ Pa}$$ and $$10\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$4.5\\text{ m s}^{-1}$$, $$6.0\\times10^{4}\\text{ Pa}$$ and $$9.0\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$6.3\\text{ m s}^{-1}$$, $$5.0\\times10^{4}\\text{ Pa}$$ dan $$8.0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.3\\text{ m s}^{-1}$$, $$7.0\\times10^{4}\\text{ Pa}$$ dan $$10\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.3\\text{ m s}^{-1}$$, $$5.0\\times10^{4}\\text{ Pa}$$ dan $$10\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$4.5\\text{ m s}^{-1}$$, $$6.0\\times10^{4}\\text{ Pa}$$ dan $$9.0\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
