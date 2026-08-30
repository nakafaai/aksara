import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a night market after closing without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a night market after closing.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: true,
          label:
            "Ravi's small choice changes the meaning of a green permit card while addressing a conflict in a night market after closing.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines plot structure without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
