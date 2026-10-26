import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Shade trees cost too much to water, so the town should build roofs over its sidewalks instead.",
        },
        {
          correct: false,
          label:
            "Measurements on one street prove that trees would make the whole town cooler and healthier.",
        },
        {
          correct: true,
          label:
            "Measurements on one street support planting trees on busy walking routes, with a plan for their care.",
        },
        {
          correct: false,
          label:
            "Shop owners and the public works office disagree about how hot the streets of the town become.",
        },
        {
          correct: false,
          label:
            "An infrared thermometer showed that grass stays cooler than asphalt in every season of the year.",
        },
      ],
    },
  },
  stimulus: "shade-trees",
};

export default item;
