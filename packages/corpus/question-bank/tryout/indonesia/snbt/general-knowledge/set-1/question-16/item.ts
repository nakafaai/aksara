import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Das Tor blieb nach Sonnenuntergang *geschlossen*.",
        },
        {
          isCorrect: false,
          label: "Der Hausmeister *schloss* das Tor bei Sonnenuntergang.",
        },
        {
          isCorrect: false,
          label: "Das war der *kälteste* Morgen des Monats.",
        },
        {
          isCorrect: false,
          label: "Die Besucher *warteten* vor dem Eingang.",
        },
        {
          isCorrect: false,
          label: "Der Hinweis wurde von allen Besuchern *gelesen*.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "The gate remained *locked* after sunset.",
        },
        {
          isCorrect: false,
          label: "The guard *locked* the gate at sunset.",
        },
        {
          isCorrect: false,
          label: "It was the *coldest* morning of the month.",
        },
        {
          isCorrect: false,
          label: "Visitors were *waiting* outside the gate.",
        },
        {
          isCorrect: false,
          label: "The notice was *read* by every visitor.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Kayu-kayu balok itu *terikat* dengan kuat.",
        },
        {
          isCorrect: false,
          label: "Kakinya *terinjak* saat menonton konser semalam.",
        },
        {
          isCorrect: false,
          label: "Arman menjadi siswa *terbaik* di kelas.",
        },
        {
          isCorrect: false,
          label: "Dia *tertidur* di sofa semalam.",
        },
        {
          isCorrect: false,
          label: "Dian menjadi peserta *termuda* dalam acara tersebut.",
        },
      ],
    },
  },
};

export default item;
