import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Da 32 über 24 und 26 lag, erklärte das Team den Code für sicher wirksam und führte ihn dauerhaft ein.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich die Mittelwerte 32, 24 und 26, begrenzte die Aussage wegen des ungeklärten Wettereinflusses und plante den Vergleich mehrerer Wetterlagen bei derselben Rückgabefrist von zwei Tagen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 32, 24 und 26 und plante weitere Tests, ohne die Aussage zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage wegen des ungeklärten Wettereinflusses und plante weitere Tests, ohne den Ergebnisvergleich zu nennen.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 32, 24 und 26 zeigten kein relevantes Muster, weshalb das Team die Rückgabefrist ändern wollte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because 32 exceeded 24 and 26, the team declared the code definitely effective and adopted it permanently.",
        },
        {
          isCorrect: true,
          label:
            "The team compared means of 32, 24, and 26, limited its conclusion because weather effects remained unseparated, and planned to compare several weather patterns under the same two-day return limit.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 32, 24, and 26 and planned further testing without limiting the claim.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its conclusion because weather effects remained unseparated and planned further testing without reporting the result comparison.",
        },
        {
          isCorrect: false,
          label:
            "The values 32, 24, and 26 showed no relevant pattern, so the team planned to change the return deadline.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 32 lebih tinggi daripada 24 dan 26, tim menyatakan kode pasti efektif dan menerapkannya secara permanen.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan rata-rata 32, 24, dan 26, membatasi simpulan karena pengaruh cuaca belum dipisahkan, serta merencanakan perbandingan beberapa pola cuaca dengan batas pengembalian dua hari yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 32, 24, dan 26 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi simpulan karena pengaruh cuaca belum dipisahkan dan merencanakan uji lanjutan tanpa melaporkan perbandingan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 32, 24, dan 26 tidak menunjukkan pola yang relevan sehingga tim akan mengubah batas waktu pengembalian.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
