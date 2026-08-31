import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Da 29 über 21 und 23 lag, erklärte das Team ein nach Ausfällen aktualisierter digitaler Zeitplan für wirksam und führte die Änderung dauerhaft ein.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 29, 21 und 23 und plante eine längere Wiederholung, ohne die Aussage auf Musikproberäume zu begrenzen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 29, 21 und 23, begrenzte die Aussage auf den untersuchten Kontext (Musikproberäume) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage auf Musikproberäume und plante eine längere Wiederholung, ohne den Vergleich zu nennen.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 29, 21 und 23 zeigten kein relevantes Muster, daher wollte das Team die Messregeln ändern.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because 29 exceeded 21 and 23, the team concluded that the change was effective and adopted it permanently.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 29, 21, and 23 and planned a longer repetition without limiting the claim to the context of music practice rooms.",
        },
        {
          isCorrect: true,
          label:
            "The team compared 29, 21, and 23, limited its claim to this setting (music practice rooms), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its claim to the context of music practice rooms and planned a longer repetition without reporting the comparison.",
        },
        {
          isCorrect: false,
          label:
            "The values 29, 21, and 23 showed no relevant pattern, so the team planned to change the measurement rules.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 29 lebih tinggi daripada 21 dan 23, tim menyimpulkan bahwa jadwal digital yang diperbarui setelah pembatalan efektif lalu menerapkannya secara tetap.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 29, 21, dan 23 serta merencanakan pengulangan lebih panjang tanpa membatasi klaim pada ruang latihan musik.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 29, 21, dan 23, membatasi klaim pada ruang latihan musik, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi klaim pada ruang latihan musik dan merencanakan pengulangan lebih panjang tanpa melaporkan perbandingan.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 29, 21, dan 23 tidak menunjukkan pola yang relevan sehingga tim akan mengubah kaidah pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
