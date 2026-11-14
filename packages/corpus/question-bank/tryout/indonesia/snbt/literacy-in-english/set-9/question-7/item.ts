import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "open-offices",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The badge records alone cannot show whether the conversations lost after the move were about work.",
        },
        {
          column: 2,
          label:
            "Employees at the two companies communicated less in total after the move than before it.",
        },
        {
          column: 2,
          label:
            "The move to an open plan made the employees' work worse at both companies.",
        },
        {
          column: 2,
          label:
            "Moving staff into an open plan reduces face-to-face interaction at most companies that try it.",
        },
      ],
    },
  },
};

export default item;
