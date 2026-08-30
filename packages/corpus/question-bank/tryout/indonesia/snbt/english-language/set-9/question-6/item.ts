import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a night-market waste station without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a night-market waste station.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines system alignment without connecting it to a setting.",
        },
        {
          isCorrect: true,
          label:
            "The organisers of a night-market waste station evaluated matching symbols on bins and stall permits through a comparison and consultation with affected groups.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
