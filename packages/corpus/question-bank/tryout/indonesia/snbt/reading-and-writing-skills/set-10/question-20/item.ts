import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Da 33 über 23 und 25 lag, erklärte das Team Karten mit Gehzeiten für sicher wirksam und führte sie dauerhaft ein.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 33, 23 und 25 und plante weitere Tests, ohne die Aussage zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage auf diesen Eingang und plante weitere Tests, ohne den Ergebnisvergleich zu nennen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich die Werte 33, 23 und 25, begrenzte die Aussage auf den kurzen Versuch an einem Parkeingang und plante einen längeren Test zu verschiedenen Tageszeiten unter denselben Messregeln.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 33, 23 und 25 zeigten kein relevantes Muster, weshalb das Team die Messregeln ändern wollte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because 33 exceeded 23 and 25, the team declared maps with walking times definitely effective and adopted them permanently.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 33, 23, and 25 and planned further testing without limiting the claim.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its conclusion to that entrance and planned further testing without stating the result comparison.",
        },
        {
          isCorrect: true,
          label:
            "The team compared values of 33, 23, and 25, limited its conclusion to the short trial at one park entrance, and planned a longer test at different times of day under the same measurement rules.",
        },
        {
          isCorrect: false,
          label:
            "The values 33, 23, and 25 showed no relevant pattern, so the team planned to change the measurement rules.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 33 lebih tinggi daripada 23 dan 25, tim menyatakan peta dengan waktu tempuh pasti efektif dan menerapkannya secara permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 33, 23, dan 25 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi simpulan pada pintu masuk itu dan merencanakan uji lanjutan tanpa menyebut perbandingan hasil.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan nilai 33, 23, dan 25, membatasi simpulan pada uji singkat di satu pintu masuk taman, serta merencanakan uji lebih lama pada waktu kunjungan berbeda dengan aturan pengukuran yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 33, 23, dan 25 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
