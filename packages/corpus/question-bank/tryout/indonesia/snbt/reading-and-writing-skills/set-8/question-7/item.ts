import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Geordnete Prüfung einer Änderung: Tag der offenen Labortür",
        },
        {
          isCorrect: false,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: Fragekarten an jedem Demonstrationstisch.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuchswert lag im Kontext Tag der offenen Labortür über den beiden anderen Werten.",
        },
        {
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Fragekarten an jedem Demonstrationstisch.",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte Fragekarten an jedem Demonstrationstisch an ausgewählten Tagen, während an Vergleichstagen der bisherige Ablauf bestehen blieb.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A structured test of one change: open laboratory tour",
        },
        {
          isCorrect: false,
          label:
            "The hypothesis therefore needed a limited test of question cards at each demonstration table.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (open laboratory tour), the trial value exceeded both other values.",
        },
        {
          isCorrect: false,
          label:
            "The change, question cards at each demonstration table, directly addressed the observed uncertainty.",
        },
        {
          isCorrect: true,
          label:
            "The team tested question cards at each demonstration table on selected days, while the earlier process remained on comparison days.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Uji Teratur atas Satu Perubahan: tur laboratorium terbuka",
        },
        {
          isCorrect: false,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui kartu pertanyaan untuk setiap meja demonstrasi.",
        },
        {
          isCorrect: false,
          label:
            "Di tur laboratorium terbuka, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa kartu pertanyaan untuk setiap meja demonstrasi langsung menanggapi keraguan yang diamati.",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji kartu pertanyaan untuk setiap meja demonstrasi pada hari tertentu, sedangkan alur lama tetap digunakan pada hari pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
