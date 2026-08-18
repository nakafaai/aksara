import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Sentence $$(2)$$.",
      value: false,
    },
    {
      label: "Sentence $$(4)$$.",
      value: false,
    },
    {
      label: "Sentence $$(6)$$.",
      value: false,
    },
    {
      label: "Sentence $$(7)$$.",
      value: false,
    },
    {
      label: "Sentence $$(8)$$.",
      value: true,
    },
  ],
  id: [
    {
      label: "Kalimat $$(2)$$.",
      value: false,
    },
    {
      label: "Kalimat $$(4)$$.",
      value: false,
    },
    {
      label: "Kalimat $$(6)$$.",
      value: false,
    },
    {
      label: "Kalimat $$(7)$$.",
      value: false,
    },
    {
      label: "Kalimat $$(8)$$.",
      value: true,
    },
  ],
};

export default choices;
