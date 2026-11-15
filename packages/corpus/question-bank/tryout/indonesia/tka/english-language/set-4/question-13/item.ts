import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "kite-cliff",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "He makes practical decisions from what he sees in nature.",
        },
        {
          correct: false,
          label: "He tells the narrator exactly when the rain will start.",
        },
        {
          correct: true,
          label:
            "He gives his lesson in words before he lets the narrator try.",
        },
        {
          correct: true,
          label: "He treats his late brother's kite as something precious.",
        },
        {
          correct: false,
          label: "He explains the red kite's flight as a change in the wind.",
        },
      ],
    },
  },
};

export default item;
