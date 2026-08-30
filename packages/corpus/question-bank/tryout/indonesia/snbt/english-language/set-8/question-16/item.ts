import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a multilingual welcome desk without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a multilingual welcome desk.",
        },
        {
          isCorrect: true,
          label:
            "Mei's small choice changes the meaning of a two-sided card while addressing a conflict in a multilingual welcome desk.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines metaphor without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
