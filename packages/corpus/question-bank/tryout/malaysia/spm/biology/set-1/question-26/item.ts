import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "transport-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\%$$",
        },
        {
          correct: false,
          label: "$$8\\%$$",
        },
        {
          correct: false,
          label: "$$80\\%$$",
        },
        {
          correct: true,
          label: "$$12\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\%$$",
        },
        {
          correct: false,
          label: "$$8\\%$$",
        },
        {
          correct: false,
          label: "$$80\\%$$",
        },
        {
          correct: true,
          label: "$$12\\%$$",
        },
      ],
    },
  },
};

export default item;
