import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "school-start",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Text B accepts Text A's account of teenagers' sleep but questions whether Text A's evidence fits the district.",
        },
        {
          correct: false,
          label:
            "Text B argues that a later start does not improve students' sleep.",
        },
        {
          correct: true,
          label:
            "Text A's evidence comes from a change that made school start $$55$$ minutes later.",
        },
        {
          correct: true,
          label:
            "If the district moved its high schools later but kept its primary schools at their present time, Text B says it would have to buy more buses.",
        },
        {
          correct: false,
          label:
            "Text A's figure of $$34$$ minutes is the average gain across all the students in the other city.",
        },
      ],
    },
  },
};

export default item;
