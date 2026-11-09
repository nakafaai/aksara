import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "fact-opinion",
  },
  stimulus: "repot-plant",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Repotting gives the roots fresh soil and more space.",
        },
        {
          correct: true,
          label:
            "In my experience, a plant that has just been repotted always looks a little tired for a few days, so there is no need to worry.",
        },
        { correct: false, label: "Cut off any roots that are black and soft." },
        {
          correct: false,
          label:
            "Damp soil holds together and slides out of the pot more easily.",
        },
        {
          correct: false,
          label:
            "Water slowly until water drains out of the holes at the bottom.",
        },
      ],
    },
  },
};

export default item;
