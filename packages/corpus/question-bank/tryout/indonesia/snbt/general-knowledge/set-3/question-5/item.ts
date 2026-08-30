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
          isCorrect: true,
          label:
            "Das Team prüfte eine Erinnerung einen Tag vor jedem Besuch (mobiler Bibliotheksdienst) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext mobiler Bibliotheksdienst: eine Erinnerung einen Tag vor jedem Besuch",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 27, lag über 20 und 22.",
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
          isCorrect: true,
          label:
            "The team tested a reminder sent one day before each visit in the mobile library service and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of a reminder sent one day before each visit: mobile library service",
        },
        {
          isCorrect: false,
          label: "The intervention value, 27, exceeded both 20 and 22.",
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
          isCorrect: true,
          label:
            "Tim menguji pesan pengingat sehari sebelum kunjungan pada layanan perpustakaan keliling dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam layanan perpustakaan keliling: pesan pengingat sehari sebelum kunjungan",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 27, melampaui 20 dan 22.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
