import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Satz $$(2)$$.",
      value: false,
    },
    {
      label: "Satz $$(4)$$.",
      value: false,
    },
    {
      label: "Satz $$(12)$$.",
      value: true,
    },
    {
      label: "Satz $$(13)$$.",
      value: false,
    },
    {
      label: "Satz $$(15)$$.",
      value: false,
    },
  ],
  en: [
    {
      label: "sentence $$(2)$$.",
      value: false,
    },
    {
      label: "sentence $$(4)$$.",
      value: false,
    },
    {
      label: "sentence $$(12)$$.",
      value: true,
    },
    {
      label: "sentence $$(13)$$.",
      value: false,
    },
    {
      label: "sentence $$(15)$$.",
      value: false,
    },
  ],
  id: [
    {
      label: "kalimat $$(2)$$.",
      value: false,
    },
    {
      label: "kalimat $$(4)$$.",
      value: false,
    },
    {
      label: "kalimat $$(12)$$.",
      value: true,
    },
    {
      label: "kalimat $$(13)$$.",
      value: false,
    },
    {
      label: "kalimat $$(15)$$.",
      value: false,
    },
  ],
};

export default choices;
