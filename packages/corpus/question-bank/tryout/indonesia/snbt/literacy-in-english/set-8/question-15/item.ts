import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "hotel-survey",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About $$92\\%$$",
        },
        {
          correct: false,
          label: "About $$71\\%$$",
        },
        {
          correct: false,
          label: "About $$50\\%$$",
        },
        {
          correct: true,
          label: "About $$56\\%$$",
        },
        {
          correct: false,
          label: "About $$13\\%$$",
        },
      ],
    },
  },
};

export default item;
