import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "weather-notebook",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "She refuses to work with Arif again.",
        },
        {
          correct: false,
          label: "She values speed more than fairness.",
        },
        {
          correct: false,
          label:
            "She remains confident that her first explanation was reasonable despite the later evidence.",
        },
        {
          correct: true,
          label: "She can reflect on a mistake and revise her judgment.",
        },
        {
          correct: false,
          label:
            "She values preserving the recovered notebook more than revising her first judgment.",
        },
      ],
    },
  },
};

export default item;
