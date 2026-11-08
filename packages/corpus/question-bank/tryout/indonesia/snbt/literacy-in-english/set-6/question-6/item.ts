import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "grading-curve",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Grades should be abolished because they turn students into rivals.",
        },
        {
          correct: false,
          label:
            "A strict curve is the fairest way to deal with tests that are too hard.",
        },
        {
          correct: true,
          label:
            "Grades should measure students against clear standards, not each other.",
        },
        {
          correct: false,
          label:
            "Teachers should give more A grades so that weaker classes are protected.",
        },
        {
          correct: false,
          label:
            "Study groups are more useful than grades for judging what students know.",
        },
      ],
    },
  },
};

export default item;
