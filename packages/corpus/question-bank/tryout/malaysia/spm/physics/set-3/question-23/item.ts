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
          correct: false,
          label: "$$15.5\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$13.5\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$17.6\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$11.5\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$15.5\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$13.5\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$17.6\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$11.5\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
