import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "night-orchard",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "He believes the pump is close to failing and must be watched every minute until morning.",
        },
        {
          correct: false,
          label:
            "He has lost interest in the orchard now that every twig has been cased in ice.",
        },
        {
          correct: false,
          label:
            "He wants to find out whether the narrator knows how to repair the old pump if it should break down during the coldest part of the night.",
        },
        {
          correct: false,
          label:
            "He is annoyed that the narrator questioned his decision to water the trees.",
        },
        {
          correct: true,
          label:
            "He is more tired than he will admit, and he gives her a task so that neither of them has to say so.",
        },
      ],
    },
  },
};

export default item;
