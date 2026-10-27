import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "outline",
  },
  stimulus: "power-cut",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A power cut scares Bayu, his grandmother calls, he gets her stick and a candle, and he prepares for next time.",
        },
        {
          correct: false,
          label:
            "Bayu lights a candle, the tall man appears, his grandmother calls him, and his parents come home early.",
        },
        {
          correct: false,
          label:
            "His parents call from the wedding, Bayu finds the candles, the lights go out, and his grandmother falls asleep.",
        },
        {
          correct: false,
          label:
            "The lights go out, Bayu's grandmother finds the candles herself, Bayu tells her a story, and the power returns.",
        },
        {
          correct: false,
          label:
            "Bayu waits on the sofa until the power comes back, and only then does he put out two flashlights.",
        },
      ],
    },
  },
};

export default item;
