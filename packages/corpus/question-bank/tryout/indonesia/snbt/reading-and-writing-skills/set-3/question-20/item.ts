import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Da 31 über 23 und 25 lag, erklärte das Team die Karten für wirksam und führte sie dauerhaft ein.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 31, 23 und 25 und plante mehr Termine, ohne seine Aussage auf diesen Workshop zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte seine Aussage auf diesen Workshop und plante mehr Termine, ohne den Vergleich zu nennen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 31, 23 und 25, begrenzte seine Aussage auf diesen Workshop und plante mehr Termine unter denselben Messregeln.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 31, 23 und 25 zeigten kein relevantes Muster, weshalb das Team die Messregeln ändern wollte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because 31 exceeded 23 and 25, the team declared the cards effective and adopted them permanently.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 31, 23, and 25 and planned more sessions without limiting its claim to that workshop.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its claim to that workshop and planned more sessions without reporting the comparison.",
        },
        {
          isCorrect: true,
          label:
            "The team compared 31, 23, and 25, limited its claim to that workshop, and planned more sessions under the same measurement rules.",
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
            "Karena 31 lebih tinggi daripada 23 dan 25, tim memastikan kartu efektif lalu menerapkannya secara permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 31, 23, dan 25 lalu merencanakan lebih banyak sesi tanpa membatasi klaim pada lokakarya tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi klaim pada lokakarya tersebut dan merencanakan lebih banyak sesi tanpa melaporkan perbandingan.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 31, 23, dan 25, membatasi klaim pada lokakarya tersebut, lalu merencanakan lebih banyak sesi dengan aturan ukur yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 31, 23, dan 25 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
