import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Geordnete Prüfung einer Änderung: Verteilung von Mangrovensetzlingen",
        },
        {
          isCorrect: false,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: Pflanzortetiketten auf jedem Tablett.",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte Pflanzortetiketten auf jedem Tablett an ausgewählten Tagen, während an Vergleichstagen der bisherige Ablauf bestehen blieb.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuchswert lag im Kontext Verteilung von Mangrovensetzlingen über den beiden anderen Werten.",
        },
        {
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Pflanzortetiketten auf jedem Tablett.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A structured test of one change: mangrove seedling distribution",
        },
        {
          isCorrect: false,
          label:
            "The hypothesis therefore needed a limited test of planting-site labels on every tray.",
        },
        {
          isCorrect: true,
          label:
            "The team tested planting-site labels on every tray on selected days, while the earlier process remained on comparison days.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (mangrove seedling distribution), the trial value exceeded both other values.",
        },
        {
          isCorrect: false,
          label:
            "The change, planting-site labels on every tray, directly addressed the observed uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Uji Teratur atas Satu Perubahan: pembagian bibit mangrove",
        },
        {
          isCorrect: false,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui label lokasi tanam.",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji label lokasi tanam pada hari tertentu, sedangkan alur lama tetap digunakan pada hari pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Di pembagian bibit mangrove, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa label lokasi tanam langsung menanggapi keraguan yang diamati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
