import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "half-sleep",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Some animals sleep with half the brain at a time, which keeps them safe or moving.",
        },
        {
          correct: false,
          label:
            "Dolphins are the only animals that are able to sleep while they keep swimming.",
        },
        {
          correct: false,
          label:
            "Humans sleep badly in hotels because half of the brain stays fully awake all night.",
        },
        {
          correct: false,
          label:
            "Frigatebirds sleep for more hours in the air than they do when resting on land.",
        },
        {
          correct: false,
          label:
            "Sleep matters less for birds than for mammals, since birds can fly while resting.",
        },
      ],
    },
  },
};

export default item;
