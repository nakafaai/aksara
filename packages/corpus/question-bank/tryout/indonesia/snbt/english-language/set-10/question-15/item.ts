import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about an event-planning meeting",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in an event-planning meeting should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of contingency",
        },
        {
          isCorrect: true,
          label: "Caleb's next step in an event-planning meeting",
        },
        {
          isCorrect: false,
          label: "One rule for every an event-planning meeting",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
