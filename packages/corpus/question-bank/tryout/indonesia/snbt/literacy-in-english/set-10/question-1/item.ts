import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The class proved that two cells in series always double a circuit's voltage, current, power, and operating time.",
        },
        {
          isCorrect: false,
          label:
            "The class compared cell arrangements and found that the parallel arrangement produced the largest terminal voltage across the resistor.",
        },
        {
          isCorrect: false,
          label:
            "The class measured potential difference mainly to determine which arrangement would deliver the greatest power under every possible load.",
        },
        {
          isCorrect: true,
          label:
            "The class found a higher terminal voltage for two cells in series under one fixed load, while its controls and limitations kept the conclusion tied to the tested circuit.",
        },
        {
          isCorrect: false,
          label:
            "By rotating the cells between arrangements, the class removed any need to measure internal resistance or test other resistor values.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
