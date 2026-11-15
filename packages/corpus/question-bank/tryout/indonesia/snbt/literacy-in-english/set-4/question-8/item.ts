import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "school-start",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About $$34$$",
        },
        {
          correct: true,
          label: "About $$19$$",
        },
        {
          correct: false,
          label: "About $$30$$",
        },
        {
          correct: false,
          label: "About $$62$$",
        },
        {
          correct: false,
          label: "About $$4$$",
        },
      ],
    },
  },
};

export default item;
