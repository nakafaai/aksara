import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "reproduction-and-growth-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Day 15 to day 19",
        },
        {
          correct: false,
          label: "Day 11 to day 15",
        },
        {
          correct: false,
          label: "Day 18 to day 21",
        },
        {
          correct: false,
          label: "Day 14 to day 18",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Hari ke-15 hingga hari ke-19",
        },
        {
          correct: false,
          label: "Hari ke-11 hingga hari ke-15",
        },
        {
          correct: false,
          label: "Hari ke-18 hingga hari ke-21",
        },
        {
          correct: false,
          label: "Hari ke-14 hingga hari ke-18",
        },
      ],
    },
  },
};

export default item;
