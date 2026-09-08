import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wird den Pfeilversuch verlängern und das Maß für abgeschlossene Rundgänge ändern.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird nur die Termine mit den meisten abgeschlossenen Rundgängen wiederholen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird die Pfeile statt weiterer Tests dauerhaft einführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch verlängern, ohne die Umkehrpunkte zu erfassen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wird den Pfeilversuch verlängern, Umkehrpunkte erfassen und dasselbe Maß für abgeschlossene Rundgänge verwenden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team will extend the arrow test while changing the route-completion measure.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat only sessions with the highest route-completion counts.",
        },
        {
          isCorrect: false,
          label:
            "The team will adopt arrows permanently instead of conducting further tests.",
        },
        {
          isCorrect: false,
          label:
            "The team will extend the test without recording where visitors turn back.",
        },
        {
          isCorrect: true,
          label:
            "The team will extend the arrow test, record where visitors turn back, and retain the route-completion measure.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan memperpanjang uji panah sambil mengubah ukuran penyelesaian rute.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya sesi dengan jumlah penyelesaian rute tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan panah permanen sebagai pengganti pengujian lanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan memperpanjang uji tanpa mencatat titik pengunjung berbalik.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan memperpanjang uji panah, mencatat titik pengunjung berbalik, dan mempertahankan ukuran penyelesaian rute.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
