import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "sequence",
  },
  stimulus: "paper-lantern",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "rolling it into a tube, with the cuts running from top to bottom",
        },
        {
          correct: false,
          label: "drawing a line 2 centimeters below the open edges",
        },
        { correct: false, label: "gluing the handle across the top" },
        { correct: false, label: "folding the sheet in half lengthwise" },
        {
          correct: false,
          label: "pressing the top and bottom toward each other",
        },
      ],
    },
  },
};

export default item;
