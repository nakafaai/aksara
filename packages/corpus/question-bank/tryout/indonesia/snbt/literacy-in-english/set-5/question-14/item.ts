import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "measles-coverage",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The number of unvaccinated children in each district and in each school",
        },
        {
          correct: false,
          label:
            "The total number of vaccine doses given in the province last year",
        },
        {
          correct: false,
          label:
            "The provincial coverage figure for each of the previous five years",
        },
        {
          correct: true,
          label: "Which communities and schools the outbreak's cases came from",
        },
        {
          correct: false,
          label:
            "The share of children with two doses in neighbouring provinces",
        },
      ],
    },
  },
};

export default item;
