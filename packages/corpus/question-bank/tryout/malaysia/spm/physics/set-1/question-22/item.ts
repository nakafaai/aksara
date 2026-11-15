import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3.5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$8.2\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$2.3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$4.9\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3.5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$8.2\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$2.3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$4.9\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
