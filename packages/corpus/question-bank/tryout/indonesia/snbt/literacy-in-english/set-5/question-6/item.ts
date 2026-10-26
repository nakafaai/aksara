import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The organisers of a community food pantry evaluated shelf labels showing the date each package entered through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          correct: false,
          label:
            "The organisers of a community food pantry evaluated shelf labels showing the date each package entered through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          correct: false,
          label:
            "The organisers of a community food pantry evaluated shelf labels showing the date each package entered through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          correct: true,
          label:
            "The pantry team compared entry-date labels with baseline and comparison conditions, consulted affected groups, and supported only a limited extension because demand varied.",
        },
        {
          correct: false,
          label:
            "The organisers of a community food pantry evaluated shelf labels showing the date each package entered mainly by defining a technical term, with the proposed change serving only as background information.",
        },
      ],
    },
  },
};

export default item;
