import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch verlängern und die Messgröße für passende Abholungen ändern.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird nur Termine mit der höchsten Zahl passender Abholungen wiederholen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wird den Vorbestellungsversuch verlängern, Anwesenheit und Reste erfassen und dasselbe Maß für passende Abholungen verwenden.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird Vorbestellungen statt weiterer Tests dauerhaft einführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch verlängern, ohne Anwesenheit und Reste zu erfassen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team will extend the test while changing the order-matching measure.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat only sessions with the highest number of matched orders.",
        },
        {
          isCorrect: true,
          label:
            "The team will extend the advance-ordering test, record attendance and leftovers, and retain the order-matching measure.",
        },
        {
          isCorrect: false,
          label:
            "The team will adopt advance ordering permanently instead of conducting further tests.",
        },
        {
          isCorrect: false,
          label:
            "The team will extend the test without recording attendance and leftovers.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan memperpanjang uji sambil mengubah ukuran kesesuaian pesanan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya sesi dengan jumlah pesanan sesuai tertinggi.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan memperpanjang uji pemesanan awal, mencatat kehadiran dan sisa makanan, serta mempertahankan ukuran kesesuaian pesanan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan pemesanan awal permanen sebagai pengganti uji lanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan memperpanjang uji tanpa mencatat kehadiran dan sisa makanan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
