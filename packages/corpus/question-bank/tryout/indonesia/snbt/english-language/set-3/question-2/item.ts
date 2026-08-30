import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in root growth in germinating beans.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in root growth in germinating beans obtained exactly the same result without variation.",
        },
        {
          isCorrect: true,
          label: "The mean result with the change was 16.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to root growth in germinating beans.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents gravitropism as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
