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
            "The ice protects the blossoms mainly by keeping the wind off them.",
        },
        {
          column: 1,
          label:
            "Shutting the valve before the ice had melted could have harmed the blossoms.",
        },
        {
          column: 2,
          label:
            "The narrator understood the method from the moment the water was turned on.",
        },
        {
          column: 2,
          label:
            "The Hallers' bare trees prove that the grandfather's method works on every frosty night.",
        },
      ],
    },
  },
};

export default item;
