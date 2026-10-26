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
            "The class tested how a blue-light filter affected leaf growth under different light colours, while controlling the listed factors but treating one short trial as proof of a universal effect.",
        },
        {
          correct: false,
          label:
            "The class tested how a blue-light filter affected leaf growth under different light colours, while reporting the limitation but leaving the comparison conditions out of the interpretation.",
        },
        {
          correct: false,
          label:
            "The class tested how a blue-light filter affected leaf growth under different light colours, while treating the scientific term as the measured outcome that settles the investigation.",
        },
        {
          correct: true,
          label:
            "The class observed greater new leaf area with a blue filter under mostly controlled conditions, but reduced light intensity prevented attributing the difference to colour alone.",
        },
        {
          correct: false,
          label:
            "The class tested how a blue-light filter affected leaf growth under different light colours, while using the comparison only to confirm the initial hypothesis and excluding the remaining uncertainty.",
        },
      ],
    },
  },
};

export default item;
