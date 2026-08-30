import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team prüfte einen Prüftisch vor der Warteschlange für Techniker (Reparaturwerkstatt für Elektronik) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 28, lag über 21 und 23.",
        },
        {
          isCorrect: true,
          label:
            "Vorsichtige Prüfung im Kontext Reparaturwerkstatt für Elektronik: einen Prüftisch vor der Warteschlange für Techniker",
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
            "The team tested an initial inspection desk before the technician queue in the electronics repair clinic and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 28, exceeded both 21 and 23.",
        },
        {
          isCorrect: true,
          label:
            "A cautious trial of an initial inspection desk before the technician queue: electronics repair clinic",
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
            "Tim menguji meja pemeriksaan awal sebelum antrean teknisi pada klinik perbaikan elektronik dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 28, melampaui 21 dan 23.",
        },
        {
          isCorrect: true,
          label:
            "Uji Hati-hati dalam klinik perbaikan elektronik: meja pemeriksaan awal sebelum antrean teknisi",
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
  stimulusKey: "passage-1",
};

export default item;
