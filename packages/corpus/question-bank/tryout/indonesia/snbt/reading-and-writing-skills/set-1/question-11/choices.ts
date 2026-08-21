import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "widerstandsfähig (Satz $$(1)$$).",
      value: false,
    },
    {
      label: "Folge (Satz $$(2)$$).",
      value: false,
    },
    {
      label: "erfüllen (Satz $$(3)$$).",
      value: false,
    },
    {
      label: "nennt (Satz $$(4)$$).",
      value: false,
    },
    {
      label: "verringern (Satz $$(7)$$).",
      value: true,
    },
  ],
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
