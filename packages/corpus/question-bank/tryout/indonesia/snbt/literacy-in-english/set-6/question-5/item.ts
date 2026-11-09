import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "half-sleep",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Resting on a quiet, sheltered beach after a long day of feeding",
        },
        {
          correct: false,
          label: "Lying on rocks on land beside other seals in its colony",
        },
        {
          correct: false,
          label:
            "Sleeping in a protected enclosure where no predators can reach it",
        },
        {
          correct: true,
          label: "Resting in the open water some distance from the shore",
        },
        {
          correct: false,
          label:
            "Lying on land during a warm afternoon when the beach is empty",
        },
      ],
    },
  },
};

export default item;
