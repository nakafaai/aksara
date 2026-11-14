import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "homework-limits",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Older pupils would lose no more from dropping homework than the pupils in the pilot did.",
        },
        {
          column: 2,
          label:
            "Children whose worksheets are finished by a parent learn less than children who work alone.",
        },
        {
          column: 1,
          label:
            "One term without homework is long enough to show any cost to attainment.",
        },
        {
          column: 2,
          label:
            "Most older pupils already spend more than $$40$$ minutes a night on homework.",
        },
        {
          column: 1,
          label:
            "Last year's pupils in the same year groups make a fair comparison for the pilot pupils.",
        },
      ],
    },
  },
};

export default item;
