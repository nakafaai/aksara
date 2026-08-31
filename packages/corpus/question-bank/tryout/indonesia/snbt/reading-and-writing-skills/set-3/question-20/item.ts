import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Da 31 über 23 und 25 lag, erklärte das Team Karten zur Reihenfolge brauner und grüner Materialien für wirksam und führte die Änderung dauerhaft ein.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 31, 23 und 25 und plante eine längere Wiederholung, ohne die Aussage auf Kompostierworkshop zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage auf Kompostierworkshop und plante eine längere Wiederholung, ohne den Vergleich zu nennen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 31, 23 und 25, begrenzte die Aussage auf den untersuchten Kontext (Kompostierworkshop) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 31, 23 und 25 zeigten kein relevantes Muster, daher wollte das Team die Messregeln ändern.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because 31 exceeded 23 and 25, the team concluded that the change was effective and adopted it permanently.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 31, 23, and 25 and planned a longer repetition without limiting the claim to the context of composting workshop.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its claim to the context of composting workshop and planned a longer repetition without reporting the comparison.",
        },
        {
          isCorrect: true,
          label:
            "The team compared 31, 23, and 25, limited its claim to this setting (composting workshop), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "The values 31, 23, and 25 showed no relevant pattern, so the team planned to change the measurement rules.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 31 lebih tinggi daripada 23 dan 25, tim menyimpulkan bahwa kartu urutan bahan cokelat dan hijau efektif lalu menerapkannya secara tetap.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 31, 23, dan 25 serta merencanakan pengulangan lebih panjang tanpa membatasi klaim pada lokakarya pembuatan kompos.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi klaim pada lokakarya pembuatan kompos dan merencanakan pengulangan lebih panjang tanpa melaporkan perbandingan.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 31, 23, dan 25, membatasi klaim pada lokakarya pembuatan kompos, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 31, 23, dan 25 tidak menunjukkan pola yang relevan sehingga tim akan mengubah kaidah pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
