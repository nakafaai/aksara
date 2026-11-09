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
            "The organisers of a neighbourhood bus information board evaluated a map showing walking time from each bus stop through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          correct: true,
          label:
            "The organisers of a neighbourhood bus information board evaluated a map showing walking time from each bus stop through a comparison and consultation with affected groups.",
        },
        {
          correct: false,
          label:
            "The organisers of a neighbourhood bus information board evaluated a map showing walking time from each bus stop through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          correct: false,
          label:
            "The organisers of a neighbourhood bus information board evaluated a map showing walking time from each bus stop through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          correct: false,
          label:
            "The organisers of a neighbourhood bus information board evaluated a map showing walking time from each bus stop mainly by defining a technical term, with the proposed change serving only as background information.",
        },
      ],
    },
  },
};

export default item;
