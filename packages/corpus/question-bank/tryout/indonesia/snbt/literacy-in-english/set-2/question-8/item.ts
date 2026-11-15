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
          label: "About $$42\\%$$, the fall that the counts show.",
        },
        {
          correct: false,
          label:
            "About $$34\\%$$, the fall at the sites minus the city-wide fall.",
        },
        {
          correct: false,
          label: "About $$8\\%$$, the same as the city-wide fall.",
        },
        {
          correct: false,
          label: "$$0\\%$$, because the whole fall is regression to the mean.",
        },
        {
          correct: true,
          label:
            "About $$21\\%$$, roughly half of the fall that the counts show.",
        },
      ],
    },
  },
};

export default item;
