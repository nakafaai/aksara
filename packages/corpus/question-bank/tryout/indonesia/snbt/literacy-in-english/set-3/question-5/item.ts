import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "tone-attitude",
  },
  stimulus: "bird-compass",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It has been proven beyond doubt by experiments in the wild.",
        },
        {
          correct: false,
          label:
            "It is less convincing than the idea of iron cells in the beak.",
        },
        {
          correct: false,
          label:
            "It is an interesting guess with no experimental support so far.",
        },
        {
          correct: true,
          label:
            "Its support is stronger than ever, but the question is not settled.",
        },
        {
          correct: false,
          label:
            "It explains bird navigation fully, so other cues are unnecessary.",
        },
      ],
    },
  },
};

export default item;
