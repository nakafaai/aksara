import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The class tested how adding a measured mass of table salt affected the temperature at which visible ice first formed, while controlling other factors and reporting a limitation.",
        },
        {
          correct: false,
          label:
            "The class tested how adding a measured mass of table salt affected the temperature at which visible ice first formed, while controlling the listed factors but treating one short trial as proof of a universal effect.",
        },
        {
          correct: false,
          label:
            "The class tested how adding a measured mass of table salt affected the temperature at which visible ice first formed, while reporting the limitation but leaving the comparison conditions out of the interpretation.",
        },
        {
          correct: false,
          label:
            "The class tested how adding a measured mass of table salt affected the temperature at which visible ice first formed, while treating the scientific term as the measured outcome that settles the investigation.",
        },
        {
          correct: false,
          label:
            "The class tested how adding a measured mass of table salt affected the temperature at which visible ice first formed, while using the comparison only to confirm the initial hypothesis and excluding the remaining uncertainty.",
        },
      ],
    },
  },
};

export default item;
