import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The organisers of a youth event-planning group evaluated a budget sheet that separated fixed, flexible, and shared costs through a comparison and consultation with affected groups.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a youth event-planning group evaluated a budget sheet that separated fixed, flexible, and shared costs through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a youth event-planning group evaluated a budget sheet that separated fixed, flexible, and shared costs through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a youth event-planning group evaluated a budget sheet that separated fixed, flexible, and shared costs through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a youth event-planning group evaluated a budget sheet that separated fixed, flexible, and shared costs mainly by defining a technical term, with the proposed change serving only as background information.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
