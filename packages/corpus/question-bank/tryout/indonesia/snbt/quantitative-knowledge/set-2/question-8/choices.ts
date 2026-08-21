import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

// Date: 2025-11-22
const choices: QuestionChoices = {
  de: [
    {
      label: "Wahr, wahr, wahr",
      value: false,
    },
    {
      label: "Wahr, wahr, falsch",
      value: true,
    },
    {
      label: "Wahr, falsch, falsch",
      value: false,
    },
    {
      label: "Falsch, wahr, wahr",
      value: false,
    },
    {
      label: "Falsch, falsch, wahr",
      value: false,
    },
  ],
  en: [
    {
      label: "True, True, True",
      value: false,
    },
    {
      label: "True, True, False",
      value: true,
    },
    {
      label: "True, False, False",
      value: false,
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
      value: true,
    },
    {
      label: "Benar, Salah, Salah",
      value: false,
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
