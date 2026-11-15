import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "response-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "S only",
        },
        {
          correct: false,
          label: "R only",
        },
        {
          correct: false,
          label: "Q and S",
        },
        {
          correct: false,
          label: "R and S",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "S sahaja",
        },
        {
          correct: false,
          label: "R sahaja",
        },
        {
          correct: false,
          label: "Q dan S",
        },
        {
          correct: false,
          label: "R dan S",
        },
      ],
    },
  },
};

export default item;
