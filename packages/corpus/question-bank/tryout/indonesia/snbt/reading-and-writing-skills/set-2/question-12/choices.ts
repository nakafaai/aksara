import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "vor Satz $$1$$.",
      value: false,
    },
    {
      label: "nach Satz $$1$$.",
      value: false,
    },
    {
      label: "nach Satz $$2$$.",
      value: false,
    },
    {
      label: "nach Satz $$3$$.",
      value: false,
    },
    {
      label: "nach Satz $$4$$.",
      value: true,
    },
  ],
  en: [
    {
      label: "before sentence $$1$$.",
      value: false,
    },
    {
      label: "after sentence $$1$$.",
      value: false,
    },
    {
      label: "after sentence $$2$$.",
      value: false,
    },
    {
      label: "after sentence $$3$$.",
      value: false,
    },
    {
      label: "after sentence $$4$$.",
      value: true,
    },
  ],
  id: [
    {
      label: "sebelum kalimat $$1$$.",
      value: false,
    },
    {
      label: "setelah kalimat $$1$$.",
      value: false,
    },
    {
      label: "setelah kalimat $$2$$.",
      value: false,
    },
    {
      label: "setelah kalimat $$3$$.",
      value: false,
    },
    {
      label: "setelah kalimat $$4$$.",
      value: true,
    },
  ],
};

export default choices;
