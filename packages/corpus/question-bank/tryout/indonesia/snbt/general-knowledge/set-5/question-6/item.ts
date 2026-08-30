import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: false,
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
            "Das Team prüfte ausleihbare Schreibtischlampen (abendlicher Leseraum) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: true,
          label:
            "Lesesitzungen von mehr als dreißig Minuten und kurze Aussagen von Nutzenden",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: false,
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
            "The team tested desk lamps that visitors could borrow in the evening reading room and interpreted the evidence cautiously.",
        },
        {
          isCorrect: true,
          label:
            "reading sessions lasting more than thirty minutes and short comments from users",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: false,
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
            "Tim menguji lampu meja yang dapat dipinjam pada ruang baca malam dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: true,
          label:
            "sesi membaca yang bertahan lebih dari tiga puluh menit dan komentar singkat pengguna",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
