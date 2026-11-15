import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$58\\%$$",
        },
        {
          correct: false,
          label: "$$84\\%$$",
        },
        {
          correct: false,
          label: "$$80\\%$$",
        },
        {
          correct: true,
          label: "$$42\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$58\\%$$",
        },
        {
          correct: false,
          label: "$$84\\%$$",
        },
        {
          correct: false,
          label: "$$80\\%$$",
        },
        {
          correct: true,
          label: "$$42\\%$$",
        },
      ],
    },
  },
};

export default item;
