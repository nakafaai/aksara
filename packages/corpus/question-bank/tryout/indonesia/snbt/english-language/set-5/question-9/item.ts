import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The definition of *stock rotation* supplies the classification rule needed to interpret the budget comparison and the consultation evidence.",
        },
        {
          isCorrect: false,
          label:
            "Calling a cost *stock rotation* establishes that the proposed change is affordable without using the estimated prices.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes *stock rotation* apply to every cost in the table, regardless of how activity levels change.",
        },
        {
          isCorrect: false,
          label:
            "The term *stock rotation* replaces the affected groups' evidence with a financial label that settles the decision by itself.",
        },
        {
          isCorrect: false,
          label:
            "The definition explains why the trial used estimated invoices, rather than how the cost category should be read.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
