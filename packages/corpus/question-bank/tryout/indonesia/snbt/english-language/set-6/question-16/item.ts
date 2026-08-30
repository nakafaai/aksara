import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a repair café during a storm without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a repair café during a storm.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines sensory imagery without connecting it to a setting.",
        },
        {
          isCorrect: true,
          label:
            "Miles's small choice changes the meaning of a spool of gold thread while addressing a conflict in a repair café during a storm.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
