import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "mangelnde Klarheit.",
      value: true,
    },
    {
      label: "Gewissheit.",
      value: false,
    },
    {
      label: "Aktualität.",
      value: false,
    },
    {
      label: "Vielfalt.",
      value: false,
    },
    {
      label: "Einheitlichkeit.",
      value: false,
    },
  ],
  en: [
    {
      label: "lack of clarity.",
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
