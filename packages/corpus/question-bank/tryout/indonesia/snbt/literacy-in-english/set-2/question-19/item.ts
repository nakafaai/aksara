import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "GenAI has already eliminated one quarter of all jobs worldwide.",
        },
        {
          correct: false,
          label: "Only low-income countries have occupations exposed to GenAI.",
        },
        {
          correct: true,
          label:
            "GenAI exposure is broad but uneven, transformation is more likely than total replacement, and implementation choices matter.",
        },
        {
          correct: false,
          label:
            "The ILO index predicts the exact date on which each worker will lose a job.",
        },
        {
          correct: false,
          label:
            "Infrastructure and worker skills have no influence on technology adoption.",
        },
      ],
    },
  },
};

export default item;
