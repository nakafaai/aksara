import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "supporting-detail",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "The project listed checkpoints from 2024 to 2040.",
        },
        {
          correct: false,
          label: "The greenhouse had a loose board.",
        },
        {
          correct: false,
          label: "The envelope looked faded.",
        },
        {
          correct: false,
          label: "The exhibition concerned future food.",
        },
        {
          correct: false,
          label: "Twelve days passed before seedlings appeared.",
        },
      ],
    },
  },
  stimulus: "future-seeds",
};

export default item;
