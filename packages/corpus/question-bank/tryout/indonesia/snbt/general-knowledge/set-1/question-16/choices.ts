import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Tor blieb nach Sonnenuntergang *geschlossen*.",
      value: true,
    },
    {
      label: "Der Hausmeister *schloss* das Tor bei Sonnenuntergang.",
      value: false,
    },
    {
      label: "Das war der *kälteste* Morgen des Monats.",
      value: false,
    },
    {
      label: "Die Besucher *warteten* vor dem Eingang.",
      value: false,
    },
    {
      label: "Der Hinweis wurde von allen Besuchern *gelesen*.",
      value: false,
    },
  ],
  en: [
    {
      label: "The gate remained *locked* after sunset.",
      value: true,
    },
    {
      label: "The guard *locked* the gate at sunset.",
      value: false,
    },
    {
      label: "It was the *coldest* morning of the month.",
      value: false,
    },
    {
      label: "Visitors were *waiting* outside the gate.",
      value: false,
    },
    {
      label: "The notice was *read* by every visitor.",
      value: false,
    },
  ],
  id: [
    {
      label: "Kayu-kayu balok itu *terikat* dengan kuat.",
      value: true,
    },
    {
      label: "Kakinya *terinjak* saat menonton konser semalam.",
      value: false,
    },
    {
      label: "Arman menjadi siswa *terbaik* di kelas.",
      value: false,
    },
    {
      label: "Dia *tertidur* di sofa semalam.",
      value: false,
    },
    {
      label: "Dian menjadi peserta *termuda* dalam acara tersebut.",
      value: false,
    },
  ],
};

export default choices;
