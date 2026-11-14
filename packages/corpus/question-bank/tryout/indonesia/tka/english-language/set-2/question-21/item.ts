import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "observatory",
  versions: {
    en: {
      columns: [
        "Still does the job it was built for",
        "Has been given a new job",
      ],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "The ground-floor workshop",
        },
        {
          column: 2,
          label: "The stone pier in the middle of the dome",
        },
        {
          column: 1,
          label: "The windowless room on the second floor",
        },
        {
          column: 2,
          label: "The long tables on the first floor",
        },
      ],
    },
  },
};

export default item;
