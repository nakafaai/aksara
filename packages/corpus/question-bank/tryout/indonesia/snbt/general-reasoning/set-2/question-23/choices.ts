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
      value: false,
    },
    {
      label: "Abteilung D",
      value: true,
    },
    {
      label: "Abteilung E",
      value: false,
    },
  ],
  en: [
    { label: "Division A", value: false },
    { label: "Division B", value: false },
    { label: "Division C", value: false },
    { label: "Division D", value: true },
    { label: "Division E", value: false },
  ],
  id: [
    { label: "Divisi A", value: false },
    { label: "Divisi B", value: false },
    { label: "Divisi C", value: false },
    { label: "Divisi D", value: true },
    { label: "Divisi E", value: false },
  ],
};

export default choices;
