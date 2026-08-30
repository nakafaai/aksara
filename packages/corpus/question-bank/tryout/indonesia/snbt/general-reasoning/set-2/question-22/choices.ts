import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Abteilung A",
      value: false,
    },
    {
      label: "Abteilung B",
      value: false,
    },
    {
      label: "Abteilung C",
      value: true,
    },
    {
      label: "Abteilung D",
      value: false,
    },
    {
      label: "Abteilung E",
      value: false,
    },
  ],
  en: [
    { label: "Division A", value: false },
    { label: "Division B", value: false },
    { label: "Division C", value: true },
    { label: "Division D", value: false },
    { label: "Division E", value: false },
  ],
  id: [
    { label: "Divisi A", value: false },
    { label: "Divisi B", value: false },
    { label: "Divisi C", value: true },
    { label: "Divisi D", value: false },
    { label: "Divisi E", value: false },
  ],
};

export default choices;
