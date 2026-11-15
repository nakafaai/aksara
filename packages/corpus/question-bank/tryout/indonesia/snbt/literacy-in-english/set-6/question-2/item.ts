import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "cholera-pump",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Removing the pump handle is what ended the Broad Street outbreak.",
        },
        {
          column: 1,
          label:
            "A cluster of deaths around the pump could also be explained by the air that nearby residents shared.",
        },
        {
          column: 2,
          label: "Snow's evidence persuaded most officials of his day.",
        },
        {
          column: 1,
          label:
            "The brewery workers' escape fits the water theory because they did not drink water from the pump.",
        },
        {
          column: 2,
          label:
            "The Lambeth company drew its water from the river below the city's sewage outlets.",
        },
      ],
    },
  },
};

export default item;
