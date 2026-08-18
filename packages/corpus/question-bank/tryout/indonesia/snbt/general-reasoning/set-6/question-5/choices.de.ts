import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Die Basketballbeteiligung steigt in jeder Jahrgangsstufe",
      value: false,
    },
    {
      label: "Tanz hat in jeder Jahrgangsstufe weniger Teilnehmende als Gesang",
      value: false,
    },
    {
      label: "Die Beteiligung am Malen steigt in jeder Jahrgangsstufe",
      value: false,
    },
    {
      label: "In jeder Klassenstufe ist Singen das am wenigsten beliebte Hobby",
      value: false,
    },
    {
      label:
        "Schauspiel hat in jeder Jahrgangsstufe die wenigsten Teilnehmenden",
      value: true,
    },
  ],
};

export default choices;
