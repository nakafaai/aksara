import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "science-fair",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Visitors asked whether wool is supposed to make things warm.",
        },
        { correct: false, label: "The judges gave the group second place." },
        { correct: true, label: "Bayu predicted that the foil would win." },
        {
          correct: false,
          label: "The group explained how trapped air slows heat.",
        },
        {
          correct: false,
          label:
            "The group found that the unwrapped cube melted in about 40 minutes.",
        },
      ],
    },
  },
};

export default item;
