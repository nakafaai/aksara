import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The organisers of a neighbourhood flood-warning exercise evaluated an alert that named the street, expected depth, and safe route through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a neighbourhood flood-warning exercise evaluated an alert that named the street, expected depth, and safe route through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          isCorrect: true,
          label:
            "The organisers of a neighbourhood flood-warning exercise evaluated an alert that named the street, expected depth, and safe route through a comparison and consultation with affected groups.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a neighbourhood flood-warning exercise evaluated an alert that named the street, expected depth, and safe route through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a neighbourhood flood-warning exercise evaluated an alert that named the street, expected depth, and safe route mainly by defining a technical term, with the proposed change serving only as background information.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
