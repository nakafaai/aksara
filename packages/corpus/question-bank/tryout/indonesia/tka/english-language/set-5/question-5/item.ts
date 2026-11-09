import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  stimulus: "night-market",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bright yellow tape on the ground marks the edges of this open lane.",
        },
        {
          correct: false,
          label:
            "The school band will play a new song at next Saturday's show.",
        },
        {
          correct: false,
          label: "Night markets first appeared in China hundreds of years ago.",
        },
        {
          correct: false,
          label:
            "Readers who dislike crowds should visit the day market instead.",
        },
        {
          correct: false,
          label:
            "The benches in front of the stage are painted green every year.",
        },
      ],
    },
  },
};

export default item;
