import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "gauge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The third paragraph reports the trial that failed, and the fourth explains how the group repaired a leak.",
        },
        {
          correct: false,
          label:
            "The third paragraph gives the method and the results of the first trial, and the fourth explains why those results were too low.",
        },
        {
          correct: true,
          label:
            "The third paragraph gives the method and the results of the trial that worked, and the fourth goes back to an earlier trial and points to its cause.",
        },
        {
          correct: false,
          label:
            "The third paragraph sets the zero line, and the fourth gives the rules for using the gauge outdoors.",
        },
        {
          correct: false,
          label:
            "The third paragraph gives the method and the results of the trial that worked, and the fourth explains that the earlier trial failed because of evaporation.",
        },
      ],
    },
  },
};

export default item;
