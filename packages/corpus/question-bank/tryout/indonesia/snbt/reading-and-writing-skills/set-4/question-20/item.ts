import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Da 28 über 18 und 20 lag, führte das Team die Genre-Schilder als dauerhafte Ordnung ein.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 28, 18 und 20 und plante Versuche bei mehr Veranstaltungen, ohne die Schlussfolgerung zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage auf wenige Termine des Büchertauschmarkts und plante weitere Tests, ohne den Vergleich zu nennen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich die Mittelwerte 28, 18 und 20, begrenzte die Aussage auf wenige kurze Termine und plante Tests bei mehr Veranstaltungen mit derselben Suchzeitgrenze.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 28, 18 und 20 zeigten kein relevantes Muster, weshalb das Team die Suchzeitgrenze ändern wollte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because 28 exceeded 18 and 20, the team adopted the genre signs as a permanent arrangement.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 28, 18, and 20 and planned tests at more events without limiting the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its conclusion to a few book-exchange sessions and planned further testing without reporting the comparison.",
        },
        {
          isCorrect: true,
          label:
            "The team compared means of 28, 18, and 20, limited its conclusion to a few short sessions, and planned tests at more events with the same search-time limit.",
        },
        {
          isCorrect: false,
          label:
            "The values 28, 18, and 20 showed no relevant pattern, so the team planned to change the search-time limit.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 28 lebih tinggi daripada 18 dan 20, tim menetapkan tanda genre sebagai susunan permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 28, 18, dan 20 serta merencanakan uji di lebih banyak acara tanpa membatasi cakupan simpulan.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi simpulan pada beberapa sesi pasar tukar buku dan merencanakan uji lanjutan tanpa melaporkan hasil perbandingan.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan rata-rata 28, 18, dan 20, membatasi simpulan pada beberapa sesi singkat, serta merencanakan uji di lebih banyak acara dengan batas waktu pencarian yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 28, 18, dan 20 tidak menunjukkan pola yang relevan sehingga tim akan mengubah batas waktu pencarian.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
