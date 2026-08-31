import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "GenAI has already eliminated one quarter of all jobs worldwide.",
        },
        {
          isCorrect: false,
          label: "Only low-income countries have occupations exposed to GenAI.",
        },
        {
          isCorrect: true,
          label:
            "GenAI exposure is broad but uneven, transformation is more likely than total replacement, and implementation choices matter.",
        },
        {
          isCorrect: false,
          label:
            "The ILO index predicts the exact date on which each worker will lose a job.",
        },
        {
          isCorrect: false,
          label:
            "Infrastructure and worker skills have no influence on technology adoption.",
        },
      ],
    },
  },
};

export default item;
