import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "speed-cameras",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About $$300$$",
        },
        {
          correct: false,
          label: "About $$50$$",
        },
        {
          correct: false,
          label: "About $$100$$",
        },
        {
          correct: true,
          label: "About $$150$$",
        },
        {
          correct: false,
          label: "About $$420$$",
        },
      ],
    },
  },
};

export default item;
