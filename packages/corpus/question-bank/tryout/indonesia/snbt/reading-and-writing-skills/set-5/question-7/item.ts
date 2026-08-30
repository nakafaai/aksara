import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Geordnete Prüfung einer Änderung: Erfassung von Straßenbäumen",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte Beispielfotos für jede Zustandskategorie an ausgewählten Tagen, während an Vergleichstagen der bisherige Ablauf bestehen blieb.",
        },
        {
          isCorrect: false,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: Beispielfotos für jede Zustandskategorie.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuchswert lag im Kontext Erfassung von Straßenbäumen über den beiden anderen Werten.",
        },
        {
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Beispielfotos für jede Zustandskategorie.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A structured test of one change: street-tree survey",
        },
        {
          isCorrect: true,
          label:
            "The team tested sample photos for each condition category on selected days, while the earlier process remained on comparison days.",
        },
        {
          isCorrect: false,
          label:
            "The hypothesis therefore needed a limited test of sample photos for each condition category.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (street-tree survey), the trial value exceeded both other values.",
        },
        {
          isCorrect: false,
          label:
            "The change, sample photos for each condition category, directly addressed the observed uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Uji Teratur atas Satu Perubahan: pendataan pohon jalan",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji contoh foto untuk setiap kategori kondisi pada hari tertentu, sedangkan alur lama tetap digunakan pada hari pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui contoh foto untuk setiap kategori kondisi.",
        },
        {
          isCorrect: false,
          label:
            "Di pendataan pohon jalan, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa contoh foto untuk setiap kategori kondisi langsung menanggapi keraguan yang diamati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
