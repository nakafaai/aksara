import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team verglich die Mittelwerte 28, 20 und 22, begrenzte die Aussage auf Aufnahmen ohne technisch bedingte Wiederholung im kurzen Versuch und plante Tests mit mehr Teams unter denselben Erfassungsregeln.",
        },
        {
          isCorrect: false,
          label:
            "Da 28 über 20 und 22 lag, erklärte das Team die gesamte Aufnahmequalität für verbessert und führte die Checkliste dauerhaft ein.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 28, 20 und 22 und plante Tests mit mehr Teams, ohne die Schlussfolgerung zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage auf technisch bedingte Wiederholungen und plante weitere Tests, ohne den Ergebnisvergleich zu nennen.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 28, 20 und 22 zeigten kein relevantes Muster, weshalb das Team die Erfassungsregeln für Wiederholungen ändern wollte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team compared means of 28, 20, and 22, limited its conclusion to recordings without technical retakes during the short trial, and planned tests with more teams under the same recording rules.",
        },
        {
          isCorrect: false,
          label:
            "Because 28 exceeded 20 and 22, the team declared that overall recording quality had improved and adopted the checklist permanently.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 28, 20, and 22 and planned tests with more teams without limiting the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its conclusion to technical retakes and planned further testing without reporting the result comparison.",
        },
        {
          isCorrect: false,
          label:
            "The values 28, 20, and 22 showed no relevant pattern, so the team planned to change the rules for recording retakes.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim membandingkan rata-rata 28, 20, dan 22, membatasi simpulan pada rekaman tanpa pengulangan teknis selama uji singkat, serta merencanakan uji dengan lebih banyak tim dan aturan pencatatan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Karena 28 lebih tinggi daripada 20 dan 22, tim menyatakan seluruh mutu rekaman meningkat dan menerapkan daftar pemeriksaan secara permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 28, 20, dan 22 serta merencanakan uji dengan lebih banyak tim tanpa membatasi cakupan simpulan.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi simpulan pada pengulangan teknis dan merencanakan uji lanjutan tanpa melaporkan perbandingan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 28, 20, dan 22 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pencatatan pengulangan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
