import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tage, an denen der bisherige Ablauf ohne die geprüfte Änderung beibehalten wurde",
        },
        {
          isCorrect: false,
          label:
            "prüfen, ob klarere Orientierung mit dem gemessenen Ergebnis zusammenhing, während Zeitplan und Personal stabil blieben",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: false,
          label:
            "richtig zugeordnete Gegenstände und kurze Aussagen von Nutzenden",
        },
        {
          isCorrect: false,
          label:
            "Das Team prüfte Beispielgegenstände an jedem Behälter (Sortierung von Küstenabfällen) und bewertete die Befunde vorsichtig.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "days when the earlier process continued without the tested change",
        },
        {
          isCorrect: false,
          label:
            "to test whether clearer guidance was associated with the measured result while schedules and staffing stayed stable",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: false,
          label:
            "items placed in the correct category and short comments from users",
        },
        {
          isCorrect: false,
          label:
            "The team tested sample objects displayed on each container in the coastal litter sorting and interpreted the evidence cautiously.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "hari ketika alur lama tetap digunakan tanpa perubahan yang diuji",
        },
        {
          isCorrect: false,
          label:
            "menguji kaitan petunjuk yang lebih jelas dengan hasil terukur sambil mempertahankan jadwal dan jumlah petugas",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "benda yang masuk ke kategori yang tepat dan komentar singkat pengguna",
        },
        {
          isCorrect: false,
          label:
            "Tim menguji contoh benda pada setiap wadah pada pemilahan sampah pesisir dan menafsirkan buktinya secara hati-hati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
