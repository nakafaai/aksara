import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "mpemba-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The result may confirm the Mpemba effect, which suggests that the 2016 study was measuring the wrong thing.",
        },
        {
          correct: false,
          label:
            "The hot cup probably lost more water by evaporation, so less water had to freeze, which fully explains the result.",
        },
        {
          correct: false,
          label:
            "The result contradicts the 2016 study, although a single trial may also reflect chance details such as supercooling.",
        },
        {
          correct: true,
          label:
            "The result does not contradict the 2016 study, which timed cooling to zero degrees, and a single trial may reflect chance details such as supercooling.",
        },
        {
          correct: false,
          label:
            "The result does not contradict the 2016 study, because that study found that hot water freezes first in home freezers.",
        },
      ],
    },
  },
};

export default item;
