import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Satz $$(2)$$.",
      value: false,
    },
    {
      label: "Satz $$(4)$$.",
      value: true,
    },
    {
      label: "Satz $$(5)$$.",
      value: false,
    },
    {
      label: "Satz $$(7)$$.",
      value: false,
    },
    {
      label: "Satz $$(9)$$.",
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
      value: true,
    },
    {
      label: "sentence $$(5)$$.",
      value: false,
    },
    {
      label: "sentence $$(7)$$.",
      value: false,
    },
    {
      label: "sentence $$(9)$$.",
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
      value: true,
    },
    {
      label: "kalimat $$(5)$$.",
      value: false,
    },
    {
      label: "kalimat $$(7)$$.",
      value: false,
    },
    {
      label: "kalimat $$(9)$$.",
      value: false,
    },
  ],
};

export default choices;
