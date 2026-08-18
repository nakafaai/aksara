import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "The anatomy of songbird wings", value: false },
    { label: "Methods for treating immune disease in birds", value: false },
    {
      label: "The seasonal routes of every European bird species",
      value: false,
    },
    { label: "Human medical advice based on bird migration", value: false },
    {
      label:
        "The relationship between movement across pathogen regions and the evolution of MHC-I diversity",
      value: true,
    },
  ],
};

export default choices;
