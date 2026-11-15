import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "nutrition-and-the-human-digestive-system",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$560\\text{ days}$$",
        },
        {
          correct: true,
          label: "$$128\\text{ days}$$",
        },
        {
          correct: false,
          label: "$$80\\text{ days}$$",
        },
        {
          correct: false,
          label: "$$50\\text{ days}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$560\\text{ hari}$$",
        },
        {
          correct: true,
          label: "$$128\\text{ hari}$$",
        },
        {
          correct: false,
          label: "$$80\\text{ hari}$$",
        },
        {
          correct: false,
          label: "$$50\\text{ hari}$$",
        },
      ],
    },
  },
};

export default item;
