import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Defining *wayfinding* proves that the walking-time map should be adopted permanently without further testing.",
        },
        {
          correct: false,
          label:
            "Once the map is classified as *wayfinding*, differences in mobility needs no longer limit the conclusion.",
        },
        {
          correct: false,
          label:
            "The definition limits *wayfinding* to measuring how quickly every passenger can walk between stops.",
        },
        {
          correct: false,
          label:
            "The term *wayfinding* replaces the trial figures and the affected groups' experience with a label that settles the decision by itself.",
        },
        {
          correct: true,
          label:
            "The definition clarifies why the walking-time map counts as a wayfinding aid, while the measurements and consultation still determine how well it works.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
