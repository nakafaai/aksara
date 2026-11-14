import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "information-validity",
  },
  stimulus: "volcano-hike",
  versions: {
    en: {
      columns: ["Supported", "Not supported"],
      kind: "matrix",
      statements: [
        { column: 2, label: "The group camped at the summit overnight." },
        { column: 1, label: "The hike started before sunrise." },
        {
          column: 2,
          label: "Fajar went back down alone after losing his water bottle.",
        },
        {
          column: 1,
          label:
            "Bu Endah stopped the group every forty minutes for water and a rest.",
        },
      ],
    },
  },
};

export default item;
