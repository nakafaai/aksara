import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "measles-coverage",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Northgate had as many unvaccinated children as Riverside, although it had only a fifth as many children.",
        },
        {
          column: 2,
          label:
            "The provincial coverage of $$94\\%$$ equals the simple average of the four districts' coverage percentages.",
        },
        {
          column: 1,
          label:
            "More than half of the province's measles cases occurred in a district that holds a tenth of its children.",
        },
        {
          column: 2,
          label: "Eastport had fewer cases for each child than Hillcrest did.",
        },
        {
          column: 1,
          label:
            "Counted per $$100{,}000$$ children, Eastport had more than nine times as many cases as Hillcrest.",
        },
      ],
    },
  },
};

export default item;
