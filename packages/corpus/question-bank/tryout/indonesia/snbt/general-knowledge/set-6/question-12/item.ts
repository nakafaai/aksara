import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Vorsichtige Prüfung im Kontext Schulbuswarteschlange: eine markierte Spur für jedes Ziel",
        },
        {
          isCorrect: false,
          label:
            "Das Team prüfte eine markierte Spur für jedes Ziel (Schulbuswarteschlange) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 28, lag über 19 und 21.",
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
          isCorrect: true,
          label:
            "A cautious trial of a marked lane for each destination: school bus queue",
        },
        {
          isCorrect: false,
          label:
            "The team tested a marked lane for each destination in the school bus queue and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 28, exceeded both 19 and 21.",
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
          isCorrect: true,
          label:
            "Uji Hati-hati dalam antrean bus sekolah: penanda jalur untuk setiap tujuan",
        },
        {
          isCorrect: false,
          label:
            "Tim menguji penanda jalur untuk setiap tujuan pada antrean bus sekolah dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 28, melampaui 19 dan 21.",
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
