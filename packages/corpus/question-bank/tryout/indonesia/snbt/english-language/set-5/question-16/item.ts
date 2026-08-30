import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a food pantry at closing time without examining evidence or choice.",
        },
        {
          isCorrect: true,
          label:
            "Samira's small choice changes the meaning of a blue date stamp while addressing a conflict in a food pantry at closing time.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a food pantry at closing time.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines motif without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
