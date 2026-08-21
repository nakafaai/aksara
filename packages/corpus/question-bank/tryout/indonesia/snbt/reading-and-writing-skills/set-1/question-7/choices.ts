import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Satz $$(7)$$.",
      value: false,
    },
    {
      label: "Satz $$(6)$$.",
      value: false,
    },
    {
      label: "Satz $$(5)$$.",
      value: false,
    },
    {
      label: "Satz $$(4)$$.",
      value: true,
    },
    {
      label: "Satz $$(3)$$.",
      value: false,
    },
  ],
  en: [
    {
      label: "sentence $$(7)$$.",
      value: false,
    },
    {
      label: "sentence $$(6)$$.",
      value: false,
    },
    {
      label: "sentence $$(5)$$.",
      value: false,
    },
    {
      label: "sentence $$(4)$$.",
      value: true,
    },
    {
      label: "sentence $$(3)$$.",
      value: false,
    },
  ],
  id: [
    {
      label: "kalimat $$(7)$$.",
      value: false,
    },
    {
      label: "kalimat $$(6)$$.",
      value: false,
    },
    {
      label: "kalimat $$(5)$$.",
      value: false,
    },
    {
      label: "kalimat $$(4)$$.",
      value: true,
    },
    {
      label: "kalimat $$(3)$$.",
      value: false,
    },
  ],
};

export default choices;
