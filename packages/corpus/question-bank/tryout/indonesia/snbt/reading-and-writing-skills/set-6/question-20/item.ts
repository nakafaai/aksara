import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team verglich die Mittelwerte 32, 22 und 24, begrenzte die Aussage auf vollständige Zeitangaben und plante die Prüfung der Übereinstimmung zwischen Freiwilligen unter denselben Zeitregeln.",
        },
        {
          isCorrect: false,
          label:
            "Da 32 über 22 und 24 lag, erklärte das Team die gesamten Meldungen für genau und führte das Beispiel dauerhaft ein.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 32, 22 und 24 und plante weitere Tests, ohne die Aussage zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage auf vollständige Zeitangaben und plante weitere Tests, ohne den Ergebnisvergleich zu nennen.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 32, 22 und 24 zeigten kein relevantes Muster, weshalb das Team die Zeitregeln ändern wollte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team compared means of 32, 22, and 24, limited its claim to complete timing, and planned to examine agreement between volunteers under the same timing rules.",
        },
        {
          isCorrect: false,
          label:
            "Because 32 exceeded 22 and 24, the team declared the entire reports accurate and adopted the example permanently.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 32, 22, and 24 and planned further testing without limiting the claim.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its claim to complete timing and planned further testing without reporting the result comparison.",
        },
        {
          isCorrect: false,
          label:
            "The values 32, 22, and 24 showed no relevant pattern, so the team planned to change the timing rules.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim membandingkan rata-rata 32, 22, dan 24, membatasi klaim pada kelengkapan waktu, serta merencanakan pemeriksaan kesesuaian antarrelawan dengan aturan pencatatan waktu yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Karena 32 lebih tinggi daripada 22 dan 24, tim menyatakan seluruh laporan akurat dan menerapkan contoh secara permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 32, 22, dan 24 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi klaim pada kelengkapan waktu dan merencanakan uji lanjutan tanpa melaporkan perbandingan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 32, 22, dan 24 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pencatatan waktu.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
