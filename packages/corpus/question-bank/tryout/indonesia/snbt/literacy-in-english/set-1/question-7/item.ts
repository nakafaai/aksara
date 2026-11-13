import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "shared-view",
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
            "Pupils of the pilot's age can go without set homework, apart from reading, at little cost to their learning.",
        },
        {
          column: 2,
          label:
            "The link between homework and achievement differs between younger and older pupils.",
        },
        {
          column: 1,
          label:
            "Pupils with little support at home should weigh heavily in decisions about homework.",
        },
        {
          column: 2,
          label:
            "Removing homework would do most to help pupils who have little support at home.",
        },
      ],
    },
  },
};

export default item;
