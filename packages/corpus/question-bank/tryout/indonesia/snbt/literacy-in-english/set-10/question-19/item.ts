import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "characterization",
  },
  stimulus: "river-ferry",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Halfway over on the last crossing, he cuts the engine and lets the boat drift in silence.",
        },
        {
          correct: true,
          label:
            "He stays home from the opening, saying that he has a bad knee.",
        },
        {
          correct: false,
          label: "A woman who has not ridden the ferry in years brings a cake.",
        },
        {
          correct: false,
          label:
            "The bridge has been growing out of both banks for three summers.",
        },
        {
          correct: true,
          label:
            "He counts the first cars crossing the bridge under his breath.",
        },
      ],
    },
  },
};

export default item;
