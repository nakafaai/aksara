import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "attendance-rules",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Raising attendance would raise grades, because attendance predicts grades so well.",
        },
        {
          column: 1,
          label:
            "An attendance rule can fill seats without making the students in them pay attention.",
        },
        {
          column: 2,
          label:
            "Watching a recorded lecture is a poor substitute for being in the room.",
        },
        {
          column: 1,
          label:
            "First-year students should be required to attend at least some of their teaching.",
        },
        {
          column: 2,
          label:
            "One department's attendance and mark figures from before and after a rule can show whether the rule works.",
        },
      ],
    },
  },
};

export default item;
