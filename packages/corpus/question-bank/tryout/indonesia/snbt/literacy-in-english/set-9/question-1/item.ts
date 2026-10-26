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
            "The smaller mesh collected a higher percentage of controlled plastic fragments, while the single-material model limited conclusions about mixed environmental debris.",
        },
        {
          correct: false,
          label:
            "The class tested how a removable mesh with smaller openings affected the capture of floating plastic fragments, while controlling the listed factors but treating one short trial as proof of a universal effect.",
        },
        {
          correct: false,
          label:
            "The class tested how a removable mesh with smaller openings affected the capture of floating plastic fragments, while reporting the limitation but leaving the comparison conditions out of the interpretation.",
        },
        {
          correct: false,
          label:
            "The class tested how a removable mesh with smaller openings affected the capture of floating plastic fragments, while treating the scientific term as the measured outcome that settles the investigation.",
        },
        {
          correct: false,
          label:
            "The class tested how a removable mesh with smaller openings affected the capture of floating plastic fragments, while using the comparison only to confirm the initial hypothesis and excluding the remaining uncertainty.",
        },
      ],
    },
  },
};

export default item;
