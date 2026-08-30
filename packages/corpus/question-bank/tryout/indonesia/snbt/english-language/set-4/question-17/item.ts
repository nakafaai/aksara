import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a quiet local museum.",
        },
        {
          isCorrect: true,
          label:
            "Eli placed one plain sentence beside the longest museum label.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a quiet local museum obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a quiet local museum.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents tone as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
