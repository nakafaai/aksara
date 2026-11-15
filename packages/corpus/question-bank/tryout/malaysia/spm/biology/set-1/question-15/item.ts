import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "coordination-and-response-in-humans",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25.0\\text{ ms}$$",
        },
        {
          correct: false,
          label: "$$24.3\\text{ ms}$$",
        },
        {
          correct: true,
          label: "$$26.0\\text{ ms}$$",
        },
        {
          correct: false,
          label: "$$26.5\\text{ ms}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25.0\\text{ ms}$$",
        },
        {
          correct: false,
          label: "$$24.3\\text{ ms}$$",
        },
        {
          correct: true,
          label: "$$26.0\\text{ ms}$$",
        },
        {
          correct: false,
          label: "$$26.5\\text{ ms}$$",
        },
      ],
    },
  },
};

export default item;
