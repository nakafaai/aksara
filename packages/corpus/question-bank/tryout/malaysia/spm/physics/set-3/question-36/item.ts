import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Q and R only",
        },
        {
          correct: false,
          label: "P and R only",
        },
        {
          correct: false,
          label: "R only",
        },
        {
          correct: false,
          label: "P, Q and R",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Q dan R sahaja",
        },
        {
          correct: false,
          label: "P dan R sahaja",
        },
        {
          correct: false,
          label: "R sahaja",
        },
        {
          correct: false,
          label: "P, Q dan R",
        },
      ],
    },
  },
};

export default item;
