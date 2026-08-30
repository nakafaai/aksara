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
            "Der Versuchswert lag im Kontext Ausleihe von Sportgeräten über den beiden anderen Werten.",
        },
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: Fotoetiketten an den Rückgaberegalen.",
        },
        {
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Fotoetiketten an den Rückgaberegalen.",
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
            "In this setting (sports equipment lending), the trial value exceeded both other values.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of photo labels on the return shelves.",
        },
        {
          isCorrect: false,
          label:
            "The change, photo labels on the return shelves, directly addressed the observed uncertainty.",
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
            "Di peminjaman alat olahraga, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji label foto yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa label foto langsung menanggapi keraguan yang diamati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
