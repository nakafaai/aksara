import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Defining *wayfinding* proves that the walking-time map should be adopted permanently without further testing.",
        },
        {
          isCorrect: false,
          label:
            "Once the map is classified as *wayfinding*, differences in mobility needs no longer limit the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The definition limits *wayfinding* to measuring how quickly every passenger can walk between stops.",
        },
        {
          isCorrect: false,
          label:
            "The term *wayfinding* replaces the trial figures and the affected groups' experience with a label that settles the decision by itself.",
        },
        {
          isCorrect: true,
          label:
            "The definition clarifies why the walking-time map counts as a wayfinding aid, while the measurements and consultation still determine how well it works.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
