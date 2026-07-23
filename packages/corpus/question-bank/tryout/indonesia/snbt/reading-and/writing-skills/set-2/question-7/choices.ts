import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "when.",
      value: false,
    },
    {
      label: "caused by.",
      value: true,
    },
    {
      label: "so that.",
      value: false,
    },
    {
      label: "so.",
      value: false,
    },
    {
      label: "because of.",
      value: false,
    },
  ],
  id: [
    {
      label: "ketika.",
      value: false,
    },
    {
      label: "disebabkan.",
      value: true,
    },
    {
      label: "supaya.",
      value: false,
    },
    {
      label: "sehingga.",
      value: false,
    },
    {
      label: "dikarenakan.",
      value: false,
    },
  ],
};

export default choices;
