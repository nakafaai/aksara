import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Satz $$(1)$$.",
      value: false,
    },
    {
      label: "Satz $$(5)$$.",
      value: false,
    },
    {
      label: "Satz $$(6)$$.",
      value: false,
    },
    {
      label: "Satz $$(8)$$.",
      value: false,
    },
    {
      label: "Satz $$(10)$$.",
      value: true,
    },
  ],
  en: [
    {
      label: "sentence $$(1)$$.",
      value: false,
    },
    {
      label: "sentence $$(5)$$.",
      value: false,
    },
    {
      label: "sentence $$(6)$$.",
      value: false,
    },
    {
      label: "sentence $$(8)$$.",
      value: false,
    },
    {
      label: "sentence $$(10)$$.",
      value: true,
    },
  ],
  id: [
    {
      label: "kalimat $$(1)$$.",
      value: false,
    },
    {
      label: "kalimat $$(5)$$.",
      value: false,
    },
    {
      label: "kalimat $$(6)$$.",
      value: false,
    },
    {
      label: "kalimat $$(8)$$.",
      value: false,
    },
    {
      label: "kalimat $$(10)$$.",
      value: true,
    },
  ],
};

export default choices;
