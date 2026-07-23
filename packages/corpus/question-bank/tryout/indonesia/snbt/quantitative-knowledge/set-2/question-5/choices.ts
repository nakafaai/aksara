import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

// Date: 2025-11-22
const choices: QuestionChoices = {
  en: [
    {
      label: "$$P > Q$$",
      value: false,
    },
    {
      label: "$$Q > P$$",
      value: false,
    },
    {
      label: "$$P = Q$$",
      value: true,
    },
    {
      label: "$$P = 2Q$$",
      value: false,
    },
    {
      label:
        "The information provided is not sufficient to decide one of the three options above",
      value: false,
    },
  ],
  id: [
    {
      label: "$$P > Q$$",
      value: false,
    },
    {
      label: "$$Q > P$$",
      value: false,
    },
    {
      label: "$$P = Q$$",
      value: true,
    },
    {
      label: "$$P = 2Q$$",
      value: false,
    },
    {
      label:
        "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari tiga pilihan di atas",
      value: false,
    },
  ],
};

export default choices;
