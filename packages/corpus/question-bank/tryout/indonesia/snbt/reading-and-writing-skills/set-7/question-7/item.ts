import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team prüfte Menübestellung am Vortag an ausgewählten Tagen, während an Vergleichstagen der bisherige Ablauf bestehen blieb.",
        },
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
          isCorrect: true,
          label:
            "The team tested menu booking one day in advance on selected days, while the earlier process remained on comparison days.",
        },
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
          isCorrect: true,
          label:
            "Tim menguji pemesanan menu sehari sebelumnya pada hari tertentu, sedangkan alur lama tetap digunakan pada hari pembanding.",
        },
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
