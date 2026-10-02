import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The tall man is real, but he leaves the house before Bayu brings the candle.",
        },
        {
          isCorrect: false,
          label:
            "The story is realistic only because it takes place during a heavy rainstorm.",
        },
        {
          isCorrect: false,
          label:
            "His grandmother also sees the tall man, which proves that the figure exists.",
        },
        {
          isCorrect: true,
          label:
            "Bayu imagines the tall man in the dark, and the candle reveals a coat stand.",
        },
        {
          isCorrect: false,
          label:
            "The coat stand really moves in the dark, but it stops when the lights return.",
        },
      ],
    },
  },
  stimulusKey: "power-cut",
};

export default item;
