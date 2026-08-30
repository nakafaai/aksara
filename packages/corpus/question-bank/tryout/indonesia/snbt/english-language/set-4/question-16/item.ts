import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a quiet local museum without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a quiet local museum.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines tone without connecting it to a setting.",
        },
        {
          isCorrect: true,
          label:
            "Eli's small choice changes the meaning of a blank caption card while addressing a conflict in a quiet local museum.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
