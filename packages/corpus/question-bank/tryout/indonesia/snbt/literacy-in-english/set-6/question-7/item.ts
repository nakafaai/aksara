import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "grading-curve",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Under a curve, helping a classmate can lower your own chances.",
        },
        {
          column: 1,
          label:
            "Supporters say curving corrects for tests that are harder than intended.",
        },
        {
          column: 2,
          label:
            "A strict curve ensures that every student with an A has mastered the material.",
        },
        {
          column: 2,
          label:
            "Teachers should never adjust marks after a test turns out to be difficult.",
        },
      ],
    },
  },
};

export default item;
