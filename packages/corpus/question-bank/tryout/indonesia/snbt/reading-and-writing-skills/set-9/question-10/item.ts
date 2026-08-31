import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: Pflanzortetiketten auf jedem Tablett.",
        },
        {
          isCorrect: false,
          label:
            "Mit geänderten Messregeln plant das Team einen längeren Test von Pflanzortetiketten auf jedem Tablett.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will nur die Tage wiederholen, an denen die Änderung Pflanzortetiketten auf jedem Tablett den höchsten Wert ergab.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will Pflanzortetiketten auf jedem Tablett dauerhaft einführen statt einen längeren Vergleich durchzuführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team plant einen längeren Test von Pflanzortetiketten auf jedem Tablett ohne Vergleichsbedingung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of planting-site labels on every tray.",
        },
        {
          isCorrect: false,
          label:
            "Using revised measurement rules, the team plans a longer test of planting-site labels on every tray.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to repeat only the days on which planting-site labels on every tray produced the highest value.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to adopt planting-site labels on every tray permanently instead of running a longer comparison.",
        },
        {
          isCorrect: false,
          label:
            "The team plans a longer test of planting-site labels on every tray without retaining a comparison condition.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji label lokasi tanam yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Dengan kaidah pengukuran yang diubah, tim merencanakan uji label lokasi tanam pada setiap baki yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hari ketika label lokasi tanam pada setiap baki menghasilkan nilai tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan label lokasi tanam pada setiap baki secara tetap sebagai pengganti perbandingan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji label lokasi tanam pada setiap baki yang lebih panjang tanpa mempertahankan kondisi pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
