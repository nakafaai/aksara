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
          correct: false,
          label: "$$17.5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$69.6\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$13.0\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$30.5\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$17.5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$69.6\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$13.0\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$30.5\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
