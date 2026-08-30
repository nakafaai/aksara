import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "festgestellt, ohne bereits eine Ursache zu behaupten",
        },
        {
          isCorrect: false,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: kontrastreichere Symbole für Sammelpunkte.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuchswert lag im Kontext Karte der Evakuierungswege über den beiden anderen Werten.",
        },
        {
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: kontrastreichere Symbole für Sammelpunkte.",
        },
        {
          isCorrect: false,
          label:
            "Der nächste Versuch mit dieser Änderung soll länger dauern: kontrastreichere Symbole für Sammelpunkte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "noticed without already claiming a cause",
        },
        {
          isCorrect: false,
          label:
            "The hypothesis therefore needed a limited test of higher-contrast assembly-point symbols.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (evacuation route map), the trial value exceeded both other values.",
        },
        {
          isCorrect: false,
          label:
            "The change, higher-contrast assembly-point symbols, directly addressed the observed uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The next test of higher-contrast assembly-point symbols will run for longer.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "mencatat gejala tanpa langsung memastikan penyebabnya",
        },
        {
          isCorrect: false,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui simbol titik kumpul yang lebih kontras.",
        },
        {
          isCorrect: false,
          label:
            "Di peta jalur evakuasi, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa simbol titik kumpul yang lebih kontras langsung menanggapi keraguan yang diamati.",
        },
        {
          isCorrect: false,
          label:
            "Uji simbol titik kumpul yang lebih kontras berikutnya akan berlangsung lebih lama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
