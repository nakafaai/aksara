import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Da 29 über 21 und 23 lag, erklärte das Team den digitalen Plan für sicher wirksam und führte ihn dauerhaft ein.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 29, 21 und 23 und plante weitere Tests, ohne die Aussage zu begrenzen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich die Werte 29, 21 und 23, begrenzte die Aussage auf den kurzen Versuch in diesen Proberäumen und plante einen längeren Test bei unterschiedlicher Wochennachfrage unter denselben Messregeln.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage auf diese Proberäume und plante weitere Tests, ohne den Ergebnisvergleich zu nennen.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 29, 21 und 23 zeigten kein relevantes Muster, weshalb das Team die Messregeln ändern wollte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because 29 exceeded 21 and 23, the team declared the digital schedule definitely effective and adopted it permanently.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 29, 21, and 23 and planned further testing without limiting the claim.",
        },
        {
          isCorrect: true,
          label:
            "The team compared values of 29, 21, and 23, limited its conclusion to the short trial in those practice rooms, and planned a longer test across weeks with different demand under the same measurement rules.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its conclusion to those practice rooms and planned further testing without stating the result comparison.",
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
            "Karena 29 lebih tinggi daripada 21 dan 23, tim menyatakan jadwal digital pasti efektif dan menerapkannya secara permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 29, 21, dan 23 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan nilai 29, 21, dan 23, membatasi simpulan pada uji singkat di ruang latihan itu, serta merencanakan uji lebih lama pada pekan dengan kepadatan berbeda menggunakan aturan pengukuran yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi simpulan pada ruang latihan itu dan merencanakan uji lanjutan tanpa menyebut perbandingan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 29, 21, dan 23 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
