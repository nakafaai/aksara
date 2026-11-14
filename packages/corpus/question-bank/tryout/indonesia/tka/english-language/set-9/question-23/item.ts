import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "first-aid",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "The average quiz score more than doubled after the course.",
        },
        {
          correct: false,
          label:
            "Every student in the class could show the recovery position after the course.",
        },
        {
          correct: false,
          label:
            "The results show how the students would act in a real emergency.",
        },
        {
          correct: true,
          label:
            "After the course, 23 more students could show the recovery position than before.",
        },
      ],
    },
  },
};

export default item;
