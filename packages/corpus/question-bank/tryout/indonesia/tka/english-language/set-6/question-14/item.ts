import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "stage-lines",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Although Maya had practiced her script for a month, she added Tomi's question to it after the performance.",
        },
        {
          correct: false,
          label: "Maya forgot her lines because she had not practiced enough.",
        },
        {
          correct: false,
          label:
            "Tomi wrote his question in Maya's script before the play began.",
        },
        {
          correct: false,
          label: "The flood in the play had really happened in Maya's village.",
        },
        {
          correct: false,
          label:
            "Maya played the fisherman, and Tomi played the chief's daughter.",
        },
      ],
    },
  },
};

export default item;
