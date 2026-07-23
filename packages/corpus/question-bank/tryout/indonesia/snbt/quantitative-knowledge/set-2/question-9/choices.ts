import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

// Date: 2025-11-22
const choices: QuestionChoices = {
  en: [
    {
      label: "True, True, True",
      value: false,
    },
    {
      label: "True, True, False",
      value: false,
    },
    {
      label: "False, True, False",
      value: true,
    },
    {
      label: "False, True, True",
      value: false,
    },
    {
      label: "False, False, True",
      value: false,
    },
  ],
  id: [
    {
      label: "Benar, Benar, Benar",
      value: false,
    },
    {
      label: "Benar, Benar, Salah",
      value: false,
    },
    {
      label: "Salah, Benar, Salah",
      value: true,
    },
    {
      label: "Salah, Benar, Benar",
      value: false,
    },
    {
      label: "Salah, Salah, Benar",
      value: false,
    },
  ],
};

export default choices;
