import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Änderung verdient eine längere Prüfung, doch der kurze Versuch erlaubt keine allgemeine Gewissheit.",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Dachgarten einer Schule: Farbetiketten für den Lichtbedarf",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte Farbetiketten für den Lichtbedarf (Dachgarten einer Schule) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 31, lag über 22 und 24.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The change deserves a longer test, but the short trial does not support universal certainty.",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of colour labels for light requirements: school rooftop garden",
        },
        {
          isCorrect: true,
          label:
            "The team tested colour labels for light requirements in the school rooftop garden and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 31, exceeded both 22 and 24.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan layak diuji lebih lama, tetapi uji singkat itu belum mendukung kepastian universal.",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam kebun atap sekolah: label warna untuk kebutuhan cahaya",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji label warna untuk kebutuhan cahaya pada kebun atap sekolah dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 31, melampaui 22 dan 24.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
