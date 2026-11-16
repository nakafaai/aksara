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
          correct: false,
          label: "$$3.5\\text{ L}$$",
        },
        {
          correct: true,
          label: "$$4.0\\text{ L}$$",
        },
        {
          correct: false,
          label: "$$1.8\\text{ L}$$",
        },
        {
          correct: false,
          label: "$$8.0\\text{ L}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.5\\text{ L}$$",
        },
        {
          correct: true,
          label: "$$4.0\\text{ L}$$",
        },
        {
          correct: false,
          label: "$$1.8\\text{ L}$$",
        },
        {
          correct: false,
          label: "$$8.0\\text{ L}$$",
        },
      ],
    },
  },
};

export default item;
