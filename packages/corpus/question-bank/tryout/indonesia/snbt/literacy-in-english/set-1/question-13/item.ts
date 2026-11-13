import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "wind-curtailment",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Fellside lost a quarter of the energy it could have produced.",
        },
        {
          correct: false,
          label: "Brackenmoor had more energy curtailed than any other farm.",
        },
        {
          correct: false,
          label:
            "The North farms together lost a larger share of their potential energy than the South farms did.",
        },
        {
          correct: false,
          label:
            "Saltmarsh lost only a twentieth of the energy it could have produced.",
        },
        {
          correct: true,
          label:
            "Gullrock lost the same share of its potential energy as Fellside did.",
        },
      ],
    },
  },
};

export default item;
