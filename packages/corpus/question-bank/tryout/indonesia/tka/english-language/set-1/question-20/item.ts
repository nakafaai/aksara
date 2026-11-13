import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "boardwalk",
  versions: {
    en: {
      columns: ["Flooded at least once a day", "Flooded less than once a day"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "The ground where glasswort grows",
        },
        {
          column: 1,
          label: "The ground where the tall, stiff grass grows",
        },
        {
          column: 1,
          label: "The bare mud where the boardwalk ends",
        },
        {
          column: 2,
          label: "The ground around the edges of the salt pans",
        },
      ],
    },
  },
};

export default item;
