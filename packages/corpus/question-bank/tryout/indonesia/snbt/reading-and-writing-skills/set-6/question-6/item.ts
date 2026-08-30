import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Geordnete Prüfung einer Änderung: Ausstellung von Schülerarbeiten",
        },
        {
          isCorrect: false,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: Richtungspfeile an jeder Abzweigung.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchswert lag im Kontext Ausstellung von Schülerarbeiten über den beiden anderen Werten.",
        },
        {
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Richtungspfeile an jeder Abzweigung.",
        },
        {
          isCorrect: false,
          label:
            "Der nächste Versuch mit dieser Änderung soll länger dauern: Richtungspfeile an jeder Abzweigung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A structured test of one change: student work exhibition",
        },
        {
          isCorrect: false,
          label:
            "The hypothesis therefore needed a limited test of direction arrows placed at each junction.",
        },
        {
          isCorrect: true,
          label:
            "In this setting (student work exhibition), the trial value exceeded both other values.",
        },
        {
          isCorrect: false,
          label:
            "The change, direction arrows placed at each junction, directly addressed the observed uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The next test of direction arrows placed at each junction will run for longer.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Uji Teratur atas Satu Perubahan: pameran karya siswa",
        },
        {
          isCorrect: false,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui panah arah yang ditempatkan.",
        },
        {
          isCorrect: true,
          label:
            "Di pameran karya siswa, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa panah arah yang ditempatkan langsung menanggapi keraguan yang diamati.",
        },
        {
          isCorrect: false,
          label:
            "Uji panah arah yang ditempatkan berikutnya akan berlangsung lebih lama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
