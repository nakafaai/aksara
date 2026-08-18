import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "GenAI has already eliminated one quarter of all jobs worldwide.",
      value: false,
    },
    {
      label:
        "GenAI exposure is broad but uneven, transformation is more likely than total replacement, and implementation choices matter.",
      value: true,
    },
    {
      label: "Only low-income countries have occupations exposed to GenAI.",
      value: false,
    },
    {
      label:
        "The ILO index predicts the exact date on which each worker will lose a job.",
      value: false,
    },
    {
      label:
        "Infrastructure and worker skills have no influence on technology adoption.",
      value: false,
    },
  ],
};

export default choices;
