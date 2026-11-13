import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "map-projection",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The author thinks the complaint that Mercator's map distorts the world misses what the map was made for.",
        },
        {
          column: 2,
          label:
            "The author thinks online maps should stop using a version of Mercator's projection.",
        },
        {
          column: 1,
          label:
            "The author holds that choosing a projection means choosing which property to keep true.",
        },
        {
          column: 2,
          label:
            "The author agrees with Peters that Mercator's map was designed to flatter Europe.",
        },
        {
          column: 2,
          label:
            "The author regards Mercator's map as the best choice for a general-purpose world map.",
        },
      ],
    },
  },
};

export default item;
