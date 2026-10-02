import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The definition proves that the series arrangement caused the larger reading, so the comparison conditions are unnecessary.",
        },
        {
          isCorrect: false,
          label:
            "The definition replaces the need to control the resistor and meter because energy per charge is constant in every circuit.",
        },
        {
          isCorrect: false,
          label:
            "The definition shows that potential difference, current, and power are interchangeable names for the same measured quantity.",
        },
        {
          isCorrect: false,
          label:
            "The term names the missing measurement of internal resistance rather than the quantity shown in the table.",
        },
        {
          isCorrect: true,
          label:
            "The definition identifies the table's voltage readings as energy transferred per unit charge between two points, without turning them into evidence about current or power by themselves.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
