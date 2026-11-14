import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "nuclear-power",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The large reactors completed recently in Europe and North America were finished late and cost more than first planned.",
        },
        {
          column: 2,
          label:
            "Batteries can already carry a grid through a long windless spell at a cost the country could reasonably bear.",
        },
        {
          column: 2,
          label:
            "Building several reactors of one design will bring down the cost of the later units in the series.",
        },
        {
          column: 1,
          label:
            "A cut in emissions made this decade is worth more than the same cut made in the following decade.",
        },
        {
          column: 2,
          label:
            "Comparing the cost of electricity plant by plant gives a fair basis for deciding what the country should build.",
        },
      ],
    },
  },
};

export default item;
