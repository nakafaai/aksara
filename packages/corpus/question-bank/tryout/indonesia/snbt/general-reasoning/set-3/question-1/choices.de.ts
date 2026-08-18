import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Interesse am Basketball steigt mit jeder Klassenstufe",
      value: false,
    },
    {
      label: "Tanz hat beste Aussichten, weil das Interesse immer größer wird",
      value: false,
    },
    {
      label:
        "Die Malerei hat beste Aussichten, da das Interesse immer größer wird",
      value: false,
    },
    {
      label: "In jeder Klassenstufe ist Singen das am wenigsten beliebte Hobby",
      value: false,
    },
    {
      label:
        "Schauspiel ist bei den Schülern am wenigsten beliebt, da es in jeder Jahrgangsstufe immer die wenigsten Teilnehmer gibt",
      value: true,
    },
  ],
};

export default choices;
