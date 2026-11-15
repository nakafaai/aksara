import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$80\\%$$",
        },
        {
          correct: true,
          label: "$$40\\%$$",
        },
        {
          correct: false,
          label: "$$60\\%$$",
        },
        {
          correct: false,
          label: "$$100\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$80\\%$$",
        },
        {
          correct: true,
          label: "$$40\\%$$",
        },
        {
          correct: false,
          label: "$$60\\%$$",
        },
        {
          correct: false,
          label: "$$100\\%$$",
        },
      ],
    },
  },
};

export default item;
