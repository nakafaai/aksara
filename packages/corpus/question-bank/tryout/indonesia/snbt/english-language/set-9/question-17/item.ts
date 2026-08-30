import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a night market after closing.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a night market after closing obtained exactly the same result without variation.",
        },
        {
          isCorrect: true,
          label:
            "Ravi followed the wrong-coloured bag backward through the crowded stalls.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a night market after closing.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents plot structure as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
