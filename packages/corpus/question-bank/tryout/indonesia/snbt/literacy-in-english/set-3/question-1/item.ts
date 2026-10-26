import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The class tested whether turning the seed opening toward the side of a clear container affected early root direction, while controlling the listed factors but treating one short trial as proof of a universal effect.",
        },
        {
          correct: false,
          label:
            "The class tested whether turning the seed opening toward the side of a clear container affected early root direction, while reporting the limitation but leaving the comparison conditions out of the interpretation.",
        },
        {
          correct: false,
          label:
            "The class tested whether turning the seed opening toward the side of a clear container affected early root direction, while treating the scientific term as the measured outcome that settles the investigation.",
        },
        {
          correct: false,
          label:
            "The class tested whether turning the seed opening toward the side of a clear container affected early root direction, while using the comparison only to confirm the initial hypothesis and excluding the remaining uncertainty.",
        },
        {
          correct: true,
          label:
            "The class tested whether turning the seed opening toward the side of a clear container affected early root direction, while controlling other factors and reporting a limitation.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
