import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Geordnete Prüfung einer Änderung: Schulfrühstücksprogramm",
        },
        {
          isCorrect: false,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: Menübestellung am Vortag.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuchswert lag im Kontext Schulfrühstücksprogramm über den beiden anderen Werten.",
        },
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: Menübestellung am Vortag.",
        },
        {
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Menübestellung am Vortag.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A structured test of one change: school breakfast programme",
        },
        {
          isCorrect: false,
          label:
            "The hypothesis therefore needed a limited test of menu booking one day in advance.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (school breakfast programme), the trial value exceeded both other values.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of menu booking one day in advance.",
        },
        {
          isCorrect: false,
          label:
            "The change, menu booking one day in advance, directly addressed the observed uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Uji Teratur atas Satu Perubahan: program sarapan sekolah",
        },
        {
          isCorrect: false,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui pemesanan menu sehari sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Di program sarapan sekolah, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji pemesanan menu sehari sebelumnya yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa pemesanan menu sehari sebelumnya langsung menanggapi keraguan yang diamati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
