import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "solar-heat",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "The panel temperature on hot, sunny days",
        },
        {
          correct: false,
          label: "The amount of sunlight reaching the panels",
        },
        {
          correct: true,
          label: "The panels' efficiency in the hottest months",
        },
        {
          correct: false,
          label: "The panels' efficiency in March and April",
        },
        {
          correct: false,
          label: "The amount of dust that settles on the glass",
        },
      ],
    },
  },
};

export default item;
