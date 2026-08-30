import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "The mean result with the change was -4.",
        },
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in the freezing point of salt solutions.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in the freezing point of salt solutions obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to the freezing point of salt solutions.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents solute as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
