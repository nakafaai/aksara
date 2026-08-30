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
          isCorrect: false,
          label:
            "Der Versuchswert lag im Kontext Ausstellung von Schülerarbeiten über den beiden anderen Werten.",
        },
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: Richtungspfeile an jeder Abzweigung.",
        },
        {
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Richtungspfeile an jeder Abzweigung.",
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
          isCorrect: false,
          label:
            "In this setting (student work exhibition), the trial value exceeded both other values.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of direction arrows placed at each junction.",
        },
        {
          isCorrect: false,
          label:
            "The change, direction arrows placed at each junction, directly addressed the observed uncertainty.",
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
          isCorrect: false,
          label:
            "Di pameran karya siswa, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji panah arah yang ditempatkan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa panah arah yang ditempatkan langsung menanggapi keraguan yang diamati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
