import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "eng.",
      value: false,
    },
    {
      label: "hoch.",
      value: true,
    },
    {
      label: "begrenzt.",
      value: false,
    },
    {
      label: "klein.",
      value: false,
    },
    {
      label: "verringert.",
      value: false,
    },
  ],
  en: [
    {
      label: "narrow.",
      value: false,
    },
    {
      label: "high.",
      value: true,
    },
    {
      label: "limited.",
      value: false,
    },
    {
      label: "small.",
      value: false,
    },
    {
      label: "reduced.",
      value: false,
    },
  ],
  id: [
    {
      label: "sempit.",
      value: false,
    },
    {
      label: "tinggi.",
      value: true,
    },
    {
      label: "terbatas.",
      value: false,
    },
    {
      label: "kecil.",
      value: false,
    },
    {
      label: "berkurang.",
      value: false,
    },
  ],
};

export default choices;
