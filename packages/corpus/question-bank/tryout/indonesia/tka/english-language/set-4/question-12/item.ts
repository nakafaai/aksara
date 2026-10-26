import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "He stays practical when he has to act in the dark.",
        },
        {
          correct: false,
          label: "He is annoyed that his grandmother needs his help.",
        },
        {
          correct: true,
          label: "He is able to joke about his own fear afterwards.",
        },
        {
          correct: true,
          label: "He tries to make his grandmother feel at ease.",
        },
      ],
    },
  },
  stimulus: "power-cut",
};

export default item;
