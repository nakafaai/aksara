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
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: kontrastreichere Symbole für Sammelpunkte.",
        },
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: kontrastreichere Symbole für Sammelpunkte.",
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
          isCorrect: false,
          label:
            "The change, higher-contrast assembly-point symbols, directly addressed the observed uncertainty.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of higher-contrast assembly-point symbols.",
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
          isCorrect: false,
          label:
            "Perubahan berupa simbol titik kumpul yang lebih kontras langsung menanggapi keraguan yang diamati.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji simbol titik kumpul yang lebih kontras yang lebih panjang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
