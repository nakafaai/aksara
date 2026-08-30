import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a community food pantry.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a community food pantry obtained exactly the same result without variation.",
        },
        {
          isCorrect: true,
          label: "The comparison condition produced a mean value of 33.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a community food pantry.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents stock rotation as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
