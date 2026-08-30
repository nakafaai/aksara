import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a neighbourhood flood-warning exercise.",
        },
        {
          isCorrect: true,
          label: "The comparison condition produced a mean value of 43.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a neighbourhood flood-warning exercise obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a neighbourhood flood-warning exercise.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents actionable information as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
