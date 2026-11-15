import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "cuckoo-eggs",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Warblers at Y can tell eggs apart better, because birds living in open reeds have sharper eyesight.",
        },
        {
          correct: false,
          label:
            "Warblers at Y have been shaped by natural selection to reject more, because their reeds are cut every year.",
        },
        {
          correct: true,
          label:
            "Warblers at Y are more likely to have seen a cuckoo near the nest, and a warbler that has seen one rejects far more often.",
        },
        {
          correct: false,
          label:
            "Cuckoos at X lay better forgeries, so the warblers there are fooled more often than the warblers at Y.",
        },
        {
          correct: false,
          label:
            "Warblers at X face more cuckoos, so tolerance costs them more, and they should in fact be rejecting more than the warblers at Y.",
        },
      ],
    },
  },
};

export default item;
