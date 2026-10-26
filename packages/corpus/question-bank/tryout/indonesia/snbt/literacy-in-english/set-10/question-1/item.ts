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
            "The class proved that two cells in series always double a circuit's voltage, current, power, and operating time.",
        },
        {
          correct: false,
          label:
            "The class compared cell arrangements and found that the parallel arrangement produced the largest terminal voltage across the resistor.",
        },
        {
          correct: false,
          label:
            "The class measured potential difference mainly to determine which arrangement would deliver the greatest power under every possible load.",
        },
        {
          correct: true,
          label:
            "The class found a higher terminal voltage for two cells in series under one fixed load, while its controls and limitations kept the conclusion tied to the tested circuit.",
        },
        {
          correct: false,
          label:
            "By rotating the cells between arrangements, the class removed any need to measure internal resistance or test other resistor values.",
        },
      ],
    },
  },
};

export default item;
