import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Satz $$2$$.",
      value: false,
    },
    {
      label: "Satz $$4$$.",
      value: false,
    },
    {
      label: "Satz $$6$$.",
      value: true,
    },
    {
      label: "Satz $$8$$.",
      value: false,
    },
    {
      label: "Satz $$10$$.",
      value: false,
    },
  ],
  en: [
    {
      label: "sentence $$2$$.",
      value: false,
    },
    {
      label: "sentence $$4$$.",
      value: false,
    },
    {
      label: "sentence $$6$$.",
      value: true,
    },
    {
      label: "sentence $$8$$.",
      value: false,
    },
    {
      label: "sentence $$10$$.",
      value: false,
    },
  ],
  id: [
    {
      label: "kalimat $$2$$.",
      value: false,
    },
    {
      label: "kalimat $$4$$.",
      value: false,
    },
    {
      label: "kalimat $$6$$.",
      value: true,
    },
    {
      label: "kalimat $$8$$.",
      value: false,
    },
    {
      label: "kalimat $$10$$.",
      value: false,
    },
  ],
};

export default choices;
