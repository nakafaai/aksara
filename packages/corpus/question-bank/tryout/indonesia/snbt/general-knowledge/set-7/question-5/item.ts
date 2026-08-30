import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team prüfte einen Prüftisch vor der Warteschlange für Techniker (Reparaturwerkstatt für Elektronik) und bewertete die Befunde vorsichtig.",
        },
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
            "Vorsichtige Prüfung im Kontext Reparaturwerkstatt für Elektronik: einen Prüftisch vor der Warteschlange für Techniker",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 28, lag über 21 und 23.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team tested an initial inspection desk before the technician queue in the electronics repair clinic and interpreted the evidence cautiously.",
        },
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
            "A cautious trial of an initial inspection desk before the technician queue: electronics repair clinic",
        },
        {
          isCorrect: false,
          label: "The intervention value, 28, exceeded both 21 and 23.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim menguji meja pemeriksaan awal sebelum antrean teknisi pada klinik perbaikan elektronik dan menafsirkan buktinya secara hati-hati.",
        },
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
            "Uji Hati-hati dalam klinik perbaikan elektronik: meja pemeriksaan awal sebelum antrean teknisi",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 28, melampaui 21 dan 23.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
