import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Nora's small choice changes the meaning of a folded bus map while addressing a conflict in a station before sunrise.",
        },
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a station before sunrise without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a station before sunrise.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines irony without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
