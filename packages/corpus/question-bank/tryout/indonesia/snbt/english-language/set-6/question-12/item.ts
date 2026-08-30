import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a small public archive.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a small public archive obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a small public archive.",
        },
        {
          isCorrect: true,
          label:
            "Theo kept the uncertain date visible and added a note explaining why it remained uncertain.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents metadata as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
