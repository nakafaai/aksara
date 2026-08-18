import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "resilient (sentence $$(1)$$).",
      value: false,
    },
    {
      label: "consequence (sentence $$(2)$$).",
      value: false,
    },
    {
      label: "meet (sentence $$(3)$$).",
      value: false,
    },
    {
      label: "recognizes (sentence $$(4)$$).",
      value: false,
    },
    {
      label: "reduce (sentence $$(7)$$).",
      value: true,
    },
  ],
  id: [
    {
      label: "tangguh (kalimat $$(1)$$).",
      value: false,
    },
    {
      label: "akibat (kalimat $$(2)$$).",
      value: false,
    },
    {
      label: "memenuhi (kalimat $$(3)$$).",
      value: false,
    },
    {
      label: "mengakui (kalimat $$(4)$$).",
      value: false,
    },
    {
      label: "memperkecil (kalimat $$(7)$$).",
      value: true,
    },
  ],
};

export default choices;
