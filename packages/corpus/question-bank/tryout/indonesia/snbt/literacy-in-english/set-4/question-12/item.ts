import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "bike-lanes",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Every street had more daily cyclists after the lanes opened.",
        },
        {
          column: 2,
          label:
            "The total number of cyclist injuries on the three streets fell after the lanes opened.",
        },
        {
          column: 1,
          label:
            "Station Avenue had the highest injury rate per cyclist both before and after the lanes opened.",
        },
        {
          column: 2,
          label: "Cycling increased only on streets that received new lanes.",
        },
      ],
    },
  },
};

export default item;
