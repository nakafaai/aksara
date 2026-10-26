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
            "The organisers of a neighbourhood flood-warning exercise evaluated an alert that named the street, expected depth, and safe route through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          correct: false,
          label:
            "The organisers of a neighbourhood flood-warning exercise evaluated an alert that named the street, expected depth, and safe route through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          correct: true,
          label:
            "The flood exercise compared a specific route-based alert across measured conditions, consulted affected groups, and supported only a limited extension because a drill cannot reproduce real emergency stress.",
        },
        {
          correct: false,
          label:
            "The organisers of a neighbourhood flood-warning exercise evaluated an alert that named the street, expected depth, and safe route through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          correct: false,
          label:
            "The organisers of a neighbourhood flood-warning exercise evaluated an alert that named the street, expected depth, and safe route mainly by defining a technical term, with the proposed change serving only as background information.",
        },
      ],
    },
  },
};

export default item;
