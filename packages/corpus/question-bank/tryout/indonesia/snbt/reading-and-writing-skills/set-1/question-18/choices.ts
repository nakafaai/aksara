import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "achtundvierzig-Komma-drei-fünf-Prozent.",
      value: false,
    },
    {
      label: "$$48{,}35\\,\\%$$.",
      value: true,
    },
    {
      label: "$$48{,}35\\text{-}\\%$$.",
      value: false,
    },
    {
      label: "$$48{,}35$$.",
      value: false,
    },
    {
      label: "$$4835\\,\\%$$.",
      value: false,
    },
  ],
  en: [
    {
      label: "forty-eight-point-three-five-percent.",
      value: false,
    },
    {
      label: "$$48.35\\%$$.",
      value: true,
    },
    {
      label: "$$48.35\\text{-}\\%$$.",
      value: false,
    },
    {
      label: "$$48.35$$.",
      value: false,
    },
    {
      label: "$$4835\\%$$.",
      value: false,
    },
  ],
  id: [
    {
      label: "empat-puluh-delapan-koma-tiga-lima-persen.",
      value: false,
    },
    {
      label: "$$48{,}35\\%$$.",
      value: true,
    },
    {
      label: "$$48{,}35\\text{-}\\%$$.",
      value: false,
    },
    {
      label: "$$48{,}35$$.",
      value: false,
    },
    {
      label: "$$4835\\%$$.",
      value: false,
    },
  ],
};

export default choices;
