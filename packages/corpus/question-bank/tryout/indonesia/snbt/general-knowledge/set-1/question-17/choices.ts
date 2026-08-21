import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "gefallen.",
      value: true,
    },
    {
      label: "Onkel.",
      value: false,
    },
    {
      label: "Nation.",
      value: false,
    },
    {
      label: "Held.",
      value: false,
    },
    {
      label: "Feind.",
      value: false,
    },
  ],
  en: [
    {
      label: "fell.",
      value: true,
    },
    {
      label: "uncle.",
      value: false,
    },
    {
      label: "nation.",
      value: false,
    },
    {
      label: "hero.",
      value: false,
    },
    {
      label: "enemy.",
      value: false,
    },
  ],
  id: [
    {
      label: "gugur.",
      value: true,
    },
    {
      label: "paman.",
      value: false,
    },
    {
      label: "bangsa.",
      value: false,
    },
    {
      label: "pahlawan.",
      value: false,
    },
    {
      label: "musuh.",
      value: false,
    },
  ],
};

export default choices;
