import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The tall man is real, but he leaves the house before Bayu brings the candle.",
        },
        {
          correct: false,
          label:
            "The story is realistic only because it takes place during a heavy rainstorm.",
        },
        {
          correct: false,
          label:
            "His grandmother also sees the tall man, which proves that the figure exists.",
        },
        {
          correct: true,
          label:
            "Bayu imagines the tall man in the dark, and the candle reveals a coat stand.",
        },
        {
          correct: false,
          label:
            "The coat stand really moves in the dark, but it stops when the lights return.",
        },
      ],
    },
  },
  stimulus: "power-cut",
};

export default item;
