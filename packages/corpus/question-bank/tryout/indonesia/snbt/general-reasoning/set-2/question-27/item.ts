import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "calendar",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "29 Mei 2027",
        },
        {
          correct: true,
          label: "30 Mei 2027",
        },
        {
          correct: false,
          label: "29 Juni 2027",
        },
        {
          correct: false,
          label: "30 Juli 2027",
        },
        {
          correct: false,
          label: "27 September 2027",
        },
      ],
    },
  },
};

export default item;
