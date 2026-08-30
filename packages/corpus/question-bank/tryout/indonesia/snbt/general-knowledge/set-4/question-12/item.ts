import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team prüfte Farbetiketten für den Lichtbedarf (Dachgarten einer Schule) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 31, lag über 22 und 24.",
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
        {
          isCorrect: true,
          label:
            "Vorsichtige Prüfung im Kontext Dachgarten einer Schule: Farbetiketten für den Lichtbedarf",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested colour labels for light requirements in the school rooftop garden and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 31, exceeded both 22 and 24.",
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
        {
          isCorrect: true,
          label:
            "A cautious trial of colour labels for light requirements: school rooftop garden",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji label warna untuk kebutuhan cahaya pada kebun atap sekolah dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 31, melampaui 22 dan 24.",
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
        {
          isCorrect: true,
          label:
            "Uji Hati-hati dalam kebun atap sekolah: label warna untuk kebutuhan cahaya",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
