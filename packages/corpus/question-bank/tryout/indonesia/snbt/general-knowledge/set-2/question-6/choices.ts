import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "insects.",
      value: false,
    },
    {
      label: "small animals.",
      value: false,
    },
    {
      label: "bat prey.",
      value: false,
    },
    {
      label: "bats.",
      value: true,
    },
    {
      label: "insects and small animals.",
      value: false,
    },
  ],
  id: [
    {
      label: "serangga.",
      value: false,
    },
    {
      label: "hewan kecil.",
      value: false,
    },
    {
      label: "mangsa kelelawar.",
      value: false,
    },
    {
      label: "kelelawar.",
      value: true,
    },
    {
      label: "serangga dan hewan kecil.",
      value: false,
    },
  ],
};

export default choices;
