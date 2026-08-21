import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Satz $$(11)$$.",
      value: true,
    },
    {
      label: "Satz $$(12)$$.",
      value: false,
    },
    {
      label: "Satz $$(13)$$.",
      value: false,
    },
    {
      label: "Satz $$(14)$$.",
      value: false,
    },
    {
      label: "Satz $$(15)$$.",
      value: false,
    },
  ],
  en: [
    {
      label: "sentence $$(11)$$.",
      value: true,
    },
    {
      label: "sentence $$(12)$$.",
      value: false,
    },
    {
      label: "sentence $$(13)$$.",
      value: false,
    },
    {
      label: "sentence $$(14)$$.",
      value: false,
    },
    {
      label: "sentence $$(15)$$.",
      value: false,
    },
  ],
  id: [
    {
      label: "kalimat $$(11)$$.",
      value: true,
    },
    {
      label: "kalimat $$(12)$$.",
      value: false,
    },
    {
      label: "kalimat $$(13)$$.",
      value: false,
    },
    {
      label: "kalimat $$(14)$$.",
      value: false,
    },
    {
      label: "kalimat $$(15)$$.",
      value: false,
    },
  ],
};

export default choices;
