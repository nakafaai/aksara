import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.6\\text{ L min}^{-1}$$, then $$1.8\\text{ L min}^{-1}$$",
        },
        {
          correct: true,
          label: "$$8.6\\text{ L min}^{-1}$$, then $$5.8\\text{ L min}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$8.6\\text{ L min}^{-1}$$, then still $$8.6\\text{ L min}^{-1}$$",
        },
        {
          correct: false,
          label: "$$8.6\\text{ L min}^{-1}$$, then $$4.0\\text{ L min}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.6\\text{ L min}^{-1}$$, kemudian $$1.8\\text{ L min}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$8.6\\text{ L min}^{-1}$$, kemudian $$5.8\\text{ L min}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$8.6\\text{ L min}^{-1}$$, kemudian masih $$8.6\\text{ L min}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$8.6\\text{ L min}^{-1}$$, kemudian $$4.0\\text{ L min}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
