import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Klasse A",
      value: false,
    },
    {
      label: "Klasse B",
      value: false,
    },
    {
      label: "Klasse C",
      value: false,
    },
    {
      label: "Klasse D",
      value: true,
    },
    {
      label: "Klasse E",
      value: false,
    },
  ],
  en: [
    { label: "Class A", value: false },
    { label: "Class B", value: false },
    { label: "Class C", value: false },
    { label: "Class D", value: true },
    { label: "Class E", value: false },
  ],
  id: [
    { label: "Kelas A", value: false },
    { label: "Kelas B", value: false },
    { label: "Kelas C", value: false },
    { label: "Kelas D", value: true },
    { label: "Kelas E", value: false },
  ],
};

export default choices;
