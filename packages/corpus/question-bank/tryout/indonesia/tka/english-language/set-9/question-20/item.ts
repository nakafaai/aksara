import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "text-fit",
  },
  stimulus: "paper-lantern",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Fold the sheet in half lengthwise once more.",
        },
        {
          correct: true,
          label:
            "Wait until the glue is completely dry before you shape the lantern.",
        },
        {
          correct: false,
          label: "Put a small candle inside the tube to light it up.",
        },
        {
          correct: false,
          label: "Cut the handle strip into several small pieces.",
        },
        {
          correct: false,
          label: "Draw another line 2 centimeters below the fold.",
        },
      ],
    },
  },
};

export default item;
