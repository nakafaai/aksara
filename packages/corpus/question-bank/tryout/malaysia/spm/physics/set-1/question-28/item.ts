import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.0\\text{ A}$$",
        },
        {
          correct: true,
          label: "$$1.5\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$2.5\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.0\\text{ A}$$",
        },
        {
          correct: true,
          label: "$$1.5\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$2.5\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
