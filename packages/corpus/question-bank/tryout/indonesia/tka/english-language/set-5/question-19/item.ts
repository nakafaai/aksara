import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  stimulus: "fire-drill",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Moving one first-floor class into a ground-floor room",
        },
        {
          correct: false,
          label: "Moving one first-floor class into a second-floor room",
        },
        {
          correct: false,
          label:
            "Letting the first-floor classes go down in reverse alphabetical order",
        },
        {
          correct: false,
          label: "Asking each teacher to leave the room first instead of last",
        },
        {
          correct: false,
          label: "Sending the second-floor classes down Staircase A",
        },
      ],
    },
  },
};

export default item;
