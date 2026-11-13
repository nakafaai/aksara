import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "mantis-shrimp",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "It assumes the shrimp combines receptor signals as people do, and the tests undercut that without showing how rich its colour world is.",
        },
        {
          correct: false,
          label:
            "It is false, because the tests show that mantis shrimp perceive fewer colours than people, honeybees and butterflies do.",
        },
        {
          correct: false,
          label:
            "It holds for colours people can see, but the extra receptors matter mainly for detecting ultraviolet light.",
        },
        {
          correct: false,
          label:
            "It would be right if the shrimp used opponent coding, which the tests suggest it does for most colours.",
        },
        {
          correct: false,
          label:
            "It is premature only because a single species was tested, so other mantis shrimp may still see unimaginable colours.",
        },
      ],
    },
  },
};

export default item;
