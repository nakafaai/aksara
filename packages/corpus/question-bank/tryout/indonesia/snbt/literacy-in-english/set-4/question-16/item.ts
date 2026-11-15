import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "spare-key",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "That Gran had found the key at once, as she said, and had rung only to see whether the narrator would come.",
        },
        {
          correct: false,
          label:
            "That Gran had not been able to find the key, and had pretended to be locked out so that the narrator would visit.",
        },
        {
          correct: true,
          label:
            "That Gran had not been able to find the key and needed the narrator's directions, and that her story of a test covered this.",
        },
        {
          correct: false,
          label:
            "That Gran had not been able to find the key because the narrator had hidden it in the wrong flowerpot.",
        },
        {
          correct: false,
          label:
            "That Gran had found the key but had forgotten which door it opened, and was too proud to say so.",
        },
      ],
    },
  },
};

export default item;
