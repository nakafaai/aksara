import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "longitude-clock",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "A navigator using lunar distances still needed a clock that had kept home-port time since the voyage began.",
        },
        {
          column: 2,
          label: "In the years after the Nautical Almanac appeared, most navigators stopped using lunar distances.",
        },
        {
          column: 1,
          label: "H4's loss on the voyage to Jamaica was less than a twentieth of the clock error that the Act allowed.",
        },
        {
          column: 1,
          label: "The Act's half-degree limit allowed a ship near the equator a larger error in kilometres than a ship far to the north.",
        },
      ],
    },
  },
};

export default item;
