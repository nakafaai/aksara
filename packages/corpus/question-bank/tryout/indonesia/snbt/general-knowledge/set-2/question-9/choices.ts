import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "coiling.",
      value: false,
    },
    {
      label: "draining.",
      value: true,
    },
    {
      label: "exhaustion.",
      value: false,
    },
    {
      label: "spending.",
      value: false,
    },
    {
      label: "sorting.",
      value: false,
    },
  ],
  id: [
    {
      label: "melinggarkan.",
      value: false,
    },
    {
      label: "pengurasan.",
      value: true,
    },
    {
      label: "penghabisan.",
      value: false,
    },
    {
      label: "menghabiskan.",
      value: false,
    },
    {
      label: "pengurutan.",
      value: false,
    },
  ],
};

export default choices;
