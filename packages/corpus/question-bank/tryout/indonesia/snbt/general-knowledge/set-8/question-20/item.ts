import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team prüfte eine Anzeige freier Plätze an der Tür (ruhige Lernzone) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: true,
          label:
            "Vorsichtige Prüfung im Kontext ruhige Lernzone: eine Anzeige freier Plätze an der Tür",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 34, lag über 24 und 26.",
        },
        {
          isCorrect: false,
          label:
            "Tage, an denen der bisherige Ablauf ohne die geprüfte Änderung beibehalten wurde",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested a seat-availability board at the door in the quiet study zone and interpreted the evidence cautiously.",
        },
        {
          isCorrect: true,
          label:
            "A cautious trial of a seat-availability board at the door: quiet study zone",
        },
        {
          isCorrect: false,
          label: "The intervention value, 34, exceeded both 24 and 26.",
        },
        {
          isCorrect: false,
          label:
            "days when the earlier process continued without the tested change",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji papan ketersediaan kursi di pintu pada zona belajar tenang dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: true,
          label:
            "Uji Hati-hati dalam zona belajar tenang: papan ketersediaan kursi di pintu",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 34, melampaui 24 dan 26.",
        },
        {
          isCorrect: false,
          label:
            "hari ketika alur lama tetap digunakan tanpa perubahan yang diuji",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
