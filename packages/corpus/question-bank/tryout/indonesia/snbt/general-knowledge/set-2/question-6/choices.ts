import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Insekten.",
      value: false,
    },
    {
      label: "kleine Tiere.",
      value: false,
    },
    {
      label: "Beutetiere der Fledermäuse.",
      value: false,
    },
    {
      label: "Fledermäuse.",
      value: true,
    },
    {
      label: "Insekten und Kleintiere.",
      value: false,
    },
  ],
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
