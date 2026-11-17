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
        {
          correct: true,
          label: "$$3.4\\text{ s}$$ and $$29\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$2.8\\text{ s}$$ and $$28\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$2.4\\text{ s}$$ and $$29\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$3.4\\text{ s}$$ and $$34\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3.4\\text{ s}$$ dan $$29\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$2.8\\text{ s}$$ dan $$28\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$2.4\\text{ s}$$ dan $$29\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$3.4\\text{ s}$$ dan $$34\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
