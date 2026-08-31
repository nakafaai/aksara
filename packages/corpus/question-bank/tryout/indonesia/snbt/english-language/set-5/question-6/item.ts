import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The organisers of a community food pantry evaluated shelf labels showing the date each package entered through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a community food pantry evaluated shelf labels showing the date each package entered through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a community food pantry evaluated shelf labels showing the date each package entered through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          isCorrect: true,
          label:
            "The pantry team compared entry-date labels with baseline and comparison conditions, consulted affected groups, and supported only a limited extension because demand varied.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a community food pantry evaluated shelf labels showing the date each package entered mainly by defining a technical term, with the proposed change serving only as background information.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
