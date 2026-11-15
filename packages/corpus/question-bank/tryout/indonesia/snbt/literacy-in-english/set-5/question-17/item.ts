import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "night-orchard",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The grandfather's method depends on water freezing onto the blossoms throughout the coldest hours.",
        },
        {
          column: 2,
          label:
            "Once the blossoms are cased in ice, they stay safe even if the water is turned off.",
        },
        {
          column: 1,
          label:
            "Shutting the valve before the ice had melted could have harmed the blossoms.",
        },
        {
          column: 2,
          label:
            "By morning the narrator understood the method well enough to explain it without mistakes.",
        },
        {
          column: 1,
          label:
            "The Hallers' bare trees fit the method having worked, though on their own they do not prove it.",
        },
      ],
    },
  },
};

export default item;
