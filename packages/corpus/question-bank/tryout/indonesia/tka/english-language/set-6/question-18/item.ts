import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  stimulus: "bike-tire",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "It helps the glue dry more quickly." },
        {
          correct: true,
          label:
            "An object left inside the tire could puncture the tube again.",
        },
        {
          correct: false,
          label: "It makes the tire easier to push back onto the rim.",
        },
        { correct: false, label: "It shows where the bubbles came from." },
        { correct: false, label: "It keeps water away from the brake." },
      ],
    },
  },
};

export default item;
