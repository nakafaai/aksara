import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "outline",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "A power cut scares Bayu, his grandmother calls, he fetches light and her stick and prepares for next time.",
        },
        {
          isCorrect: false,
          label:
            "Bayu lights a candle, the tall man appears, his grandmother calls him, and his parents come home early.",
        },
        {
          isCorrect: false,
          label:
            "His parents call from the wedding, Bayu finds the candles, the lights go out, and his grandmother falls asleep.",
        },
        {
          isCorrect: false,
          label:
            "The lights go out, Bayu's grandmother finds the candles herself, Bayu tells her a story, and the power returns.",
        },
        {
          isCorrect: false,
          label:
            "Bayu waits on the sofa until the power comes back, and only then does he put out two flashlights.",
        },
      ],
    },
  },
  stimulusKey: "power-cut",
};

export default item;
