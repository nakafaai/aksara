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
            "The class tested how coarse fabric on a model ramp affected friction, while controlling the listed factors but treating one short trial as proof of a universal effect.",
        },
        {
          correct: false,
          label:
            "The class tested how coarse fabric on a model ramp affected friction, while reporting the limitation but leaving the comparison conditions out of the interpretation.",
        },
        {
          correct: false,
          label:
            "The class tested how coarse fabric on a model ramp affected friction, while treating the scientific term as the measured outcome that settles the investigation.",
        },
        {
          correct: false,
          label:
            "The class tested how coarse fabric on a model ramp affected friction, while using the comparison only to confirm the initial hypothesis and excluding the remaining uncertainty.",
        },
        {
          correct: true,
          label:
            "The class found that a coarse-fabric ramp was associated with a longer mean travel time under controlled conditions, while surface wear limited a broader conclusion.",
        },
      ],
    },
  },
};

export default item;
