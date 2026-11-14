import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "swim-lessons",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "to describe the town pool and its prices for school groups",
        },
        {
          correct: false,
          label: "to report the results of the sports club's swimming course",
        },
        {
          correct: false,
          label:
            "to argue that every school should build its own swimming pool",
        },
        {
          correct: false,
          label: "to explain how to float on your back for one minute",
        },
        {
          correct: true,
          label:
            "to persuade the school to add swimming lessons to physical education",
        },
      ],
    },
  },
};

export default item;
