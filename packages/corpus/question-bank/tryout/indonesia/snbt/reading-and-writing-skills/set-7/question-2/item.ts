import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
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
        {
          isCorrect: false,
          label:
            "Der nächste Versuch mit dieser Änderung soll länger dauern: Menübestellung am Vortag.",
        },
        {
          isCorrect: true,
          label: "festgestellt, ohne bereits eine Ursache zu behaupten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
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
        {
          isCorrect: false,
          label:
            "The next test of menu booking one day in advance will run for longer.",
        },
        {
          isCorrect: true,
          label: "noticed without already claiming a cause",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
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
        {
          isCorrect: false,
          label:
            "Uji pemesanan menu sehari sebelumnya berikutnya akan berlangsung lebih lama.",
        },
        {
          isCorrect: true,
          label: "mencatat gejala tanpa langsung memastikan penyebabnya",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
