import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Geordnete Prüfung einer Änderung: Karte der Evakuierungswege",
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
          isCorrect: true,
          label:
            "Das Team prüfte kontrastreichere Symbole für Sammelpunkte an ausgewählten Tagen, während an Vergleichstagen der bisherige Ablauf bestehen blieb.",
        },
        {
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: kontrastreichere Symbole für Sammelpunkte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A structured test of one change: evacuation route map",
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
          isCorrect: true,
          label:
            "The team tested higher-contrast assembly-point symbols on selected days, while the earlier process remained on comparison days.",
        },
        {
          isCorrect: false,
          label:
            "The change, higher-contrast assembly-point symbols, directly addressed the observed uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Uji Teratur atas Satu Perubahan: peta jalur evakuasi",
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
          isCorrect: true,
          label:
            "Tim menguji simbol titik kumpul yang lebih kontras pada hari tertentu, sedangkan alur lama tetap digunakan pada hari pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa simbol titik kumpul yang lebih kontras langsung menanggapi keraguan yang diamati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
