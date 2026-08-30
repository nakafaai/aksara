import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in an event-planning meeting.",
        },
        {
          isCorrect: true,
          label:
            "Caleb labelled each estimate and created a separate line for costs that could change.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in an event-planning meeting obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to an event-planning meeting.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents contingency as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
