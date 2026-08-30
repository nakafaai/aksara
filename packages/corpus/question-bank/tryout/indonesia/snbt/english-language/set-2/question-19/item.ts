import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "GenAI has already eliminated one quarter of all jobs worldwide.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "GenAI exposure is broad but uneven, transformation is more likely than total replacement, and implementation choices matter.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Only low-income countries have occupations exposed to GenAI.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The ILO index predicts the exact date on which each worker will lose a job.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Infrastructure and worker skills have no influence on technology adoption.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
