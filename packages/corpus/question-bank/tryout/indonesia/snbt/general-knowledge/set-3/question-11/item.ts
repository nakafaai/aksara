import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Ein neu gefundenes datiertes Foto hält die Handelszeit eindeutig fest und löst den Quellenkonflikt.",
        },
        {
          isCorrect: false,
          label:
            "Zwei weitere unabhängige Archive bestätigen ebenfalls den Unterschied zwischen Ortsname und Handelszeit.",
        },
        {
          isCorrect: false,
          label: "Einige Besucher bevorzugen kürzere Schilder.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum wird Korrekturen mit einer überprüfbaren Quellenangabe annehmen.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum wird die Überarbeitungsgeschichte des Ausstellungsschildes anzeigen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "A newly found dated photograph clearly records the trading time and resolves the conflict between the two sources.",
        },
        {
          isCorrect: false,
          label:
            "Two additional independent archives also show that the place name and trading time genuinely differ.",
        },
        {
          isCorrect: false,
          label: "Some visitors prefer shorter labels.",
        },
        {
          isCorrect: false,
          label:
            "The museum will accept corrections that include a verifiable source trail.",
        },
        {
          isCorrect: false,
          label:
            "The museum will display the exhibition label's revision history.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Sebuah foto bertanggal yang baru ditemukan secara jelas mencatat jam transaksi dan menyelesaikan perbedaan kedua sumber.",
        },
        {
          isCorrect: false,
          label:
            "Dua arsip independen tambahan juga menunjukkan bahwa istilah dan waktu kegiatan memang berbeda.",
        },
        {
          isCorrect: false,
          label: "Sebagian pengunjung lebih menyukai label yang lebih pendek.",
        },
        {
          isCorrect: false,
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
        {
          isCorrect: false,
          label: "Museum akan menampilkan riwayat revisi label pameran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
