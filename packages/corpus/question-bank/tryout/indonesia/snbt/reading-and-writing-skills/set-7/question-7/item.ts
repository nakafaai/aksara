import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Schülerinnen und Schüler bestellten am Vortag, weil die Wahl an der Ausgabe nachweislich immer scheiterte.",
        },
        {
          isCorrect: false,
          label:
            "Die Bestellung am Vortag wurde dauerhaft eingeführt und die Wahl an der Ausgabe eingestellt.",
        },
        {
          isCorrect: false,
          label:
            "Vorbestellungen und morgendliche Wahl wurden ohne getrennte Vergleichsbedingungen verwendet.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich Vorbestellungen nur mit Rückmeldungen zur Wahl an der Ausgabe.",
        },
        {
          isCorrect: true,
          label:
            "Bei den Versuchsterminen bestellten die Schülerinnen und Schüler am Vortag, während sie beim Vergleich morgens an der Ausgabe wählten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Students ordered the previous day because choosing at the serving table had proved to fail in every case.",
        },
        {
          isCorrect: false,
          label:
            "Previous-day ordering was adopted permanently and serving-table choices were discontinued.",
        },
        {
          isCorrect: false,
          label:
            "The team used advance orders and morning choices without separate comparison conditions.",
        },
        {
          isCorrect: false,
          label:
            "The team compared advance orders only with comments about choosing at the serving table.",
        },
        {
          isCorrect: true,
          label:
            "In trial sessions, students ordered the previous day, while in comparison sessions they chose at the serving table that morning.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Siswa memesan sehari sebelumnya karena cara memilih di meja saji terbukti selalu gagal.",
        },
        {
          isCorrect: false,
          label:
            "Pemesanan sehari sebelumnya diterapkan permanen dan pilihan di meja saji tidak digunakan lagi.",
        },
        {
          isCorrect: false,
          label:
            "Tim memakai pemesanan awal dan pilihan pagi hari tanpa memisahkan kondisi pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan pemesanan awal hanya dengan komentar tentang pilihan di meja saji.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, siswa memesan sehari sebelumnya, sedangkan pada sesi pembanding mereka memilih menu di meja saji pada pagi hari.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
