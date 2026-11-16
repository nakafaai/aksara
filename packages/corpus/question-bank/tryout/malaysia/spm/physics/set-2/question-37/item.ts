import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3.0\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$3.3\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.5\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3.0\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$3.3\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.5\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
