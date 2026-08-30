import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Geordnete Prüfung einer Änderung: Ausleihe von Sportgeräten",
        },
        {
          isCorrect: false,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: Fotoetiketten an den Rückgaberegalen.",
        },
        {
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Fotoetiketten an den Rückgaberegalen.",
        },
        {
          isCorrect: false,
          label:
            "Der nächste Versuch mit dieser Änderung soll länger dauern: Fotoetiketten an den Rückgaberegalen.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchswert lag im Kontext Ausleihe von Sportgeräten über den beiden anderen Werten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A structured test of one change: sports equipment lending",
        },
        {
          isCorrect: false,
          label:
            "The hypothesis therefore needed a limited test of photo labels on the return shelves.",
        },
        {
          isCorrect: false,
          label:
            "The change, photo labels on the return shelves, directly addressed the observed uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The next test of photo labels on the return shelves will run for longer.",
        },
        {
          isCorrect: true,
          label:
            "In this setting (sports equipment lending), the trial value exceeded both other values.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Uji Teratur atas Satu Perubahan: peminjaman alat olahraga",
        },
        {
          isCorrect: false,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui label foto.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa label foto langsung menanggapi keraguan yang diamati.",
        },
        {
          isCorrect: false,
          label: "Uji label foto berikutnya akan berlangsung lebih lama.",
        },
        {
          isCorrect: true,
          label:
            "Di peminjaman alat olahraga, nilai hari uji melampaui dua nilai lainnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
