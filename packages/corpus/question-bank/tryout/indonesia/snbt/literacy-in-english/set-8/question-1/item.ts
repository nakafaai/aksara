import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The class tested how forming connected triangles in a paper bridge affected load distribution, while controlling the listed factors but treating one short trial as proof of a universal effect.",
        },
        {
          correct: false,
          label:
            "The class tested how forming connected triangles in a paper bridge affected load distribution, while reporting the limitation but leaving the comparison conditions out of the interpretation.",
        },
        {
          correct: false,
          label:
            "The class tested how forming connected triangles in a paper bridge affected load distribution, while treating the scientific term as the measured outcome that settles the investigation.",
        },
        {
          correct: false,
          label:
            "The class tested how forming connected triangles in a paper bridge affected load distribution, while using the comparison only to confirm the initial hypothesis and excluding the remaining uncertainty.",
        },
        {
          correct: true,
          label:
            "The triangular-truss bridges held more washers under a controlled setup, while variation in paper fibres and folds kept the result provisional.",
        },
      ],
    },
  },
};

export default item;
