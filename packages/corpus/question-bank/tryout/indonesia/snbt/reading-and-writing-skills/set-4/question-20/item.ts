import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Da 28 über 18 und 20 lag, erklärte das Team Genreschilder auf jedem Tisch für wirksam und führte die Änderung dauerhaft ein.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 28, 18 und 20 und plante eine längere Wiederholung, ohne die Aussage auf Büchertauschmarkt zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage auf Büchertauschmarkt und plante eine längere Wiederholung, ohne den Vergleich zu nennen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 28, 18 und 20, begrenzte die Aussage auf den untersuchten Kontext (Büchertauschmarkt) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 28, 18 und 20 zeigten kein relevantes Muster, daher wollte das Team die Messregeln ändern.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because 28 exceeded 18 and 20, the team concluded that the change was effective and adopted it permanently.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 28, 18, and 20 and planned a longer repetition without limiting the claim to the context of book exchange market.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its claim to the context of book exchange market and planned a longer repetition without reporting the comparison.",
        },
        {
          isCorrect: true,
          label:
            "The team compared 28, 18, and 20, limited its claim to this setting (book exchange market), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "The values 28, 18, and 20 showed no relevant pattern, so the team planned to change the measurement rules.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 28 lebih tinggi daripada 18 dan 20, tim menyimpulkan bahwa tanda genre di setiap meja efektif lalu menerapkannya secara tetap.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 28, 18, dan 20 serta merencanakan pengulangan lebih panjang tanpa membatasi klaim pada pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi klaim pada pasar tukar buku dan merencanakan pengulangan lebih panjang tanpa melaporkan perbandingan.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 28, 18, dan 20, membatasi klaim pada pasar tukar buku, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 28, 18, dan 20 tidak menunjukkan pola yang relevan sehingga tim akan mengubah kaidah pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
