import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The definition proves that the series arrangement caused the larger reading, so the comparison conditions are unnecessary.",
        },
        {
          correct: false,
          label:
            "The definition replaces the need to control the resistor and meter because energy per charge is constant in every circuit.",
        },
        {
          correct: false,
          label:
            "The definition shows that potential difference, current, and power are interchangeable names for the same measured quantity.",
        },
        {
          correct: false,
          label:
            "The term names the missing measurement of internal resistance rather than the quantity shown in the table.",
        },
        {
          correct: true,
          label:
            "The definition identifies the table's voltage readings as energy transferred per unit charge between two points, without turning them into evidence about current or power by themselves.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
