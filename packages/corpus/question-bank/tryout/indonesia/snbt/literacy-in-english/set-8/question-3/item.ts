import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "city-birdsong",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sparrows in San Francisco had stopped defending their territories.",
        },
        {
          correct: false,
          label: "Lockdowns made sparrows less attractive to potential mates.",
        },
        {
          correct: false,
          label:
            "Sparrows can only hear songs from about twice their usual distance.",
        },
        {
          correct: false,
          label: "The sparrows left the city during the lockdowns.",
        },
        {
          correct: true,
          label:
            "The birds had been singing loudly mainly because of traffic noise.",
        },
      ],
    },
  },
};

export default item;
