import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team veränderte alle Faktoren zugleich, nämlich kleine Karten mit Gehzeiten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wechselte einen Faktor-faktoren: kleine Karten mit Gehzeiten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team tat nur einen Faktor anders: kleine Karten mit Gehzeiten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte einzig alle Faktoren: kleine Karten mit Gehzeiten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: kleine Karten mit Gehzeiten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team alterated only one factor: small maps showing walking times.",
        },
        {
          isCorrect: false,
          label:
            "The team changed every factors at once: small maps showing walking times.",
        },
        {
          isCorrect: false,
          label:
            "The team did one factor differently thing: small maps showing walking times.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only all factors: small maps showing walking times.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: small maps showing walking times.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu peta kecil yang menampilkan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor-faktor, yaitu peta kecil yang menampilkan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim berubah satu faktor saja, yaitu peta kecil yang menampilkan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah semua faktor saja, yaitu peta kecil yang menampilkan waktu tempuh.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu peta kecil yang menampilkan waktu tempuh.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
