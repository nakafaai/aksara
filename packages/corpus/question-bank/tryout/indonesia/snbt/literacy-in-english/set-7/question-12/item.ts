import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "museum-visits",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Every visitor group came in larger numbers after the gallery opened.",
        },
        {
          column: 1,
          label:
            "Families' average visit became 50 percent longer after the gallery opened.",
        },
        {
          column: 1,
          label:
            "In the first period, adults without children were the largest group.",
        },
        {
          column: 2,
          label:
            "School groups' average visit became longer after the gallery opened.",
        },
      ],
    },
  },
};

export default item;
