import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "crow-tools",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A crow solves a hole-probing task within seconds on its very first try, using the kind of twig it handles every day in the wild.",
        },
        {
          correct: false,
          label:
            "A crow given a plastic strip it has never seen bends it into a working hook after several failed attempts, improving each time.",
        },
        {
          correct: true,
          label:
            "A crow shown materials it has never touched picks out, before trying any, the one piece whose shape suits a task unlike anything crows do in the wild.",
        },
        {
          correct: false,
          label:
            "A wild crow is filmed bending a twig into a hook and then using it at once to pull a grub out of a rotten log.",
        },
        {
          correct: false,
          label:
            "A crow that has spent weeks handling a set of wire pieces quickly chooses the right one for a puzzle it has never met before.",
        },
      ],
    },
  },
};

export default item;
