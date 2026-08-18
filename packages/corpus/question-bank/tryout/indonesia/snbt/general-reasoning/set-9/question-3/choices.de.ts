import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Allein die Temperatur entscheidet darüber, ob der Schädlingsdruck zunimmt",
      value: false,
    },
    {
      label:
        "Der Klimawandel kann beeinflussen, wo sich Schädlinge ausbreiten und wie große Schäden sie anrichten",
      value: true,
    },
    {
      label:
        "Pflanzenschädlinge und Pflanzenkrankheiten vernichten jedes Jahr bei jeder Nutzpflanze genau denselben Anteil",
      value: false,
    },
    {
      label:
        "Niederschlag und Landnutzung haben keinen Einfluss auf den Schädlingsdruck",
      value: false,
    },
    {
      label: "Der Klimawandel macht jeden Schädling überall schädlicher",
      value: false,
    },
  ],
};

export default choices;
