import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "open-offices",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The distance between colleagues affects how often they talk to one another.",
        },
        {
          column: 2,
          label:
            "Taking down partitions increases the amount of face-to-face talk among colleagues.",
        },
        {
          column: 1,
          label: "Noise is a real cost of working on an open floor.",
        },
        {
          column: 2,
          label:
            "Lower rent per desk is a main reason that firms choose open-plan offices.",
        },
        {
          column: 1,
          label:
            "Quick, unplanned questions between colleagues can be valuable for their work.",
        },
      ],
    },
  },
};

export default item;
