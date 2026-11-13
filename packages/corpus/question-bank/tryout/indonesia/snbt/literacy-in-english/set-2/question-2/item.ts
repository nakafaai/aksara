import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "waggle-dance",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "At the feeder, because the waggle run gives the distance in metres whatever route the recruit takes.",
        },
        {
          correct: false,
          label:
            "Short of the feeder, because the tunnel made the forager's flight feel longer than it really was.",
        },
        {
          correct: false,
          label:
            "Off to one side, because the tunnel walls hid the sun that the dance uses to give its bearing.",
        },
        {
          correct: false,
          label:
            "At the feeder, because a recruit reads the distance with the same flexible ruler as the dancer.",
        },
        {
          correct: true,
          label:
            "Beyond the feeder, because open fields give her less registered distance per metre than the tunnel did.",
        },
      ],
    },
  },
};

export default item;
