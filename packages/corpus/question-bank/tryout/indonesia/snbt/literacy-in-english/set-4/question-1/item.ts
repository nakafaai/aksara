import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "deep-vents",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Vent life runs on chemical energy from bacteria yet still depends on the sun indirectly.",
        },
        {
          correct: false,
          label:
            "The vents were discovered by accident while scientists were searching for shipwrecks.",
        },
        {
          correct: false,
          label:
            "Tube worms are the only animals that can survive at the bottom of the Pacific Ocean.",
        },
        {
          correct: false,
          label:
            "Hydrogen sulphide is harmless to animals that live near the vents.",
        },
        {
          correct: false,
          label:
            "Life on Europa has probably developed in the same way as life around vents.",
        },
      ],
    },
  },
};

export default item;
