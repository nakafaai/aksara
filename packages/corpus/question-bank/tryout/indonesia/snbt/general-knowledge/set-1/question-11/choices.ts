import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "unclarity.",
      value: true,
    },
    {
      label: "certainty.",
      value: false,
    },
    {
      label: "timeliness.",
      value: false,
    },
    {
      label: "diversity.",
      value: false,
    },
    {
      label: "uniformity.",
      value: false,
    },
  ],
  id: [
    {
      label: "ketidakjelasan.",
      value: true,
    },
    {
      label: "kepastian.",
      value: false,
    },
    {
      label: "ketepatwaktuan.",
      value: false,
    },
    {
      label: "keanekaragaman.",
      value: false,
    },
    {
      label: "keseragaman.",
      value: false,
    },
  ],
};

export default choices;
