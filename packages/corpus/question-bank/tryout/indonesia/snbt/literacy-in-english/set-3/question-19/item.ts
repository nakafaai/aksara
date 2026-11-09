import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "rosetta-stone",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It allowed him to read the Greek section of the stone for the first time.",
        },
        {
          correct: false,
          label:
            "It showed him which temples contained the oldest royal cartouches.",
        },
        {
          correct: false,
          label:
            "It proved that hieroglyphs were symbols expressing mystical ideas.",
        },
        {
          correct: false,
          label:
            "It let him translate the Demotic script directly without any comparison.",
        },
        {
          correct: true,
          label:
            "It gave him a sense of spoken Egyptian against which to check readings.",
        },
      ],
    },
  },
};

export default item;
