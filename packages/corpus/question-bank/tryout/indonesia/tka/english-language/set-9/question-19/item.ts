import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "paper-lantern",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "a story about a lantern festival followed by a moral",
        },
        {
          correct: false,
          label: "an argument that families should make their own decorations",
        },
        {
          correct: true,
          label:
            "a safety note, a list of materials, numbered steps, and a tip",
        },
        {
          correct: false,
          label: "a description of lanterns from different countries",
        },
        {
          correct: false,
          label: "the steps first, then the materials, then a warning",
        },
      ],
    },
  },
};

export default item;
