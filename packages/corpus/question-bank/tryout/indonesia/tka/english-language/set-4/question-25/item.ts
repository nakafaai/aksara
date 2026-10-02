import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Shade trees cost too much to water, so the town should build roofs over its sidewalks instead.",
        },
        {
          isCorrect: false,
          label:
            "Measurements on one street prove that trees would make the whole town cooler and healthier.",
        },
        {
          isCorrect: true,
          label:
            "Measurements on one street support planting trees on busy walking routes, with a plan for their care.",
        },
        {
          isCorrect: false,
          label:
            "Shop owners and the public works office disagree about how hot the streets of the town become.",
        },
        {
          isCorrect: false,
          label:
            "An infrared thermometer showed that grass stays cooler than asphalt in every season of the year.",
        },
      ],
    },
  },
  stimulusKey: "shade-trees",
};

export default item;
