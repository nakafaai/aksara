import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "city-birdsong",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The birds will begin singing only during the noisiest middle part of the day.",
        },
        {
          correct: true,
          label: "The lowest notes of their songs will tend to rise in pitch.",
        },
        {
          correct: false,
          label:
            "The lowest notes of their songs will become lower than before.",
        },
        {
          correct: false,
          label: "The birds will stop singing completely within a few weeks.",
        },
        {
          correct: false,
          label: "Females will become more attracted to the males' new songs.",
        },
      ],
    },
  },
};

export default item;
