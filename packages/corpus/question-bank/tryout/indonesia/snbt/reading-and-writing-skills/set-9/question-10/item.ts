import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team wird den Etikettenversuch verlängern, verschiedene Gezeiten einbeziehen und dieselben Messregeln beibehalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch verlängern und dabei die Messregeln ändern.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird nur Tage mit dem höchsten Ankunftswert der Setzlinge wiederholen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird die Etiketten statt weiterer Tests dauerhaft einführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch nur bei einer Gezeitenbedingung verlängern.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team will extend the tray-label test, include different tidal conditions, and retain the measurement rules.",
        },
        {
          isCorrect: false,
          label:
            "The team will extend the test while changing the measurement rules.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat only the days with the highest seedling-arrival value.",
        },
        {
          isCorrect: false,
          label:
            "The team will adopt the labels permanently instead of conducting further tests.",
        },
        {
          isCorrect: false,
          label:
            "The team will extend the test under only one tidal condition.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim akan memperpanjang uji label baki, mencakup berbagai kondisi pasang, dan mempertahankan aturan pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan memperpanjang uji sambil mengubah aturan pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya hari dengan nilai kedatangan bibit tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan label permanen sebagai pengganti uji lanjutan.",
        },
        {
          isCorrect: false,
          label: "Tim akan memperpanjang uji hanya pada satu kondisi pasang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
