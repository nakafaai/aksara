import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "meat-survey",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The youngest age group had the highest percentage of its members saying they ate less meat.",
        },
        {
          column: 2,
          label:
            "More respondents aged 45 to 64 than aged 30 to 44 said they ate less meat.",
        },
        {
          column: 2,
          label: "Health was the most common main reason in every age group.",
        },
        {
          column: 2,
          label: "The survey asked respondents how much less meat they ate.",
        },
      ],
    },
  },
};

export default item;
