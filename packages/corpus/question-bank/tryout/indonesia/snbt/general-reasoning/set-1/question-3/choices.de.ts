import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "FOLU lag im Basisjahr 2010 unter dem Energiesektor.",
      value: false,
    },
    {
      label:
        "Die Landwirtschaft hatte in der Projektion für 2030 den höchsten Wert.",
      value: false,
    },
    {
      label: "An beiden Bezugspunkten hatte derselbe Sektor den höchsten Wert.",
      value: false,
    },
    {
      label:
        "Energie und FOLU waren an beiden Bezugspunkten die zwei größten Werte, obwohl sich ihre Reihenfolge änderte.",
      value: true,
    },
    {
      label:
        "Abfall und Industrieprozesse übertrafen zusammen den Energiesektor im Basisjahr 2010.",
      value: false,
    },
  ],
};

export default choices;
