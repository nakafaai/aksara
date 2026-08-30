import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Geordnete Prüfung einer Änderung: Kochkurs für Jugendliche",
        },
        {
          isCorrect: false,
          label:
            "Der Versuchswert lag im Kontext Kochkurs für Jugendliche über den beiden anderen Werten.",
        },
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: nach Rezeptschritten geordnete Zutaten.",
        },
        {
          isCorrect: false,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: nach Rezeptschritten geordnete Zutaten.",
        },
        {
          isCorrect: false,
          label:
            "Der nächste Versuch mit dieser Änderung soll länger dauern: nach Rezeptschritten geordnete Zutaten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A structured test of one change: teen cooking class",
        },
        {
          isCorrect: false,
          label:
            "In this setting (teen cooking class), the trial value exceeded both other values.",
        },
        {
          isCorrect: true,
          label:
            "The hypothesis therefore needed a limited test of ingredients grouped by recipe stage.",
        },
        {
          isCorrect: false,
          label:
            "The change, ingredients grouped by recipe stage, directly addressed the observed uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The next test of ingredients grouped by recipe stage will run for longer.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Uji Teratur atas Satu Perubahan: kelas memasak remaja",
        },
        {
          isCorrect: false,
          label:
            "Di kelas memasak remaja, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui bahan yang dikelompokkan menurut tahap resep.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa bahan yang dikelompokkan menurut tahap resep langsung menanggapi keraguan yang diamati.",
        },
        {
          isCorrect: false,
          label:
            "Uji bahan yang dikelompokkan menurut tahap resep berikutnya akan berlangsung lebih lama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
