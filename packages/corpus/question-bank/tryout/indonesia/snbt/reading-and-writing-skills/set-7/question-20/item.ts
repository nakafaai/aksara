import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Da 32 über 24 und 26 lag, erklärte das Team ein Rückgabecode an jedem Griff für wirksam und führte die Änderung dauerhaft ein.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 32, 24 und 26, begrenzte die Aussage auf den untersuchten Kontext (Schirmverleih am Bahnhof) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 32, 24 und 26 und plante eine längere Wiederholung, ohne die Aussage auf Regenschirmverleih am Bahnhof zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage auf Regenschirmverleih am Bahnhof und plante eine längere Wiederholung, ohne den Vergleich zu nennen.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 32, 24 und 26 zeigten kein relevantes Muster, daher wollte das Team die Messregeln ändern.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because 32 exceeded 24 and 26, the team concluded that the change was effective and adopted it permanently.",
        },
        {
          isCorrect: true,
          label:
            "The team compared 32, 24, and 26, limited its claim to this setting (station umbrella lending), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 32, 24, and 26 and planned a longer repetition without limiting the claim to the context of station umbrella lending.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its claim to the context of station umbrella lending and planned a longer repetition without reporting the comparison.",
        },
        {
          isCorrect: false,
          label:
            "The values 32, 24, and 26 showed no relevant pattern, so the team planned to change the measurement rules.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 32 lebih tinggi daripada 24 dan 26, tim menyimpulkan bahwa kode pengembalian pada setiap gagang efektif lalu menerapkannya secara tetap.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 32, 24, dan 26, membatasi klaim pada peminjaman payung stasiun, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 32, 24, dan 26 serta merencanakan pengulangan lebih panjang tanpa membatasi klaim pada peminjaman payung stasiun.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi klaim pada peminjaman payung stasiun dan merencanakan pengulangan lebih panjang tanpa melaporkan perbandingan.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 32, 24, dan 26 tidak menunjukkan pola yang relevan sehingga tim akan mengubah kaidah pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
