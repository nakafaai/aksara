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
          label: "$$180\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$240\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$145\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$180\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$240\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$145\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
