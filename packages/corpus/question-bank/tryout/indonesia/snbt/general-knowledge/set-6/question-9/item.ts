import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Erste Ergebnisse zeigen Potenzial, Zugangsprobleme machen Ungleichheit sichtbar, und Änderungen prüfen diese Erklärung.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil ermittelt Reinigungskosten, der folgende legt anhand dieser Kosten die Pfandhöhe fest.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil erklärt den völligen Misserfolg, der folgende beendet die Pfanderstattung für Besucher.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil verlegt Rückgabestellen, der folgende vergleicht die Ergebnisse mit dem Festival des Vorjahres.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil beweist den vollständigen Erfolg, der folgende beschreibt die dauerhafte Einführung ohne weitere Prüfung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Initial results show potential, access problems reveal inequality, and service changes test that explanation.",
        },
        {
          isCorrect: false,
          label:
            "The first part establishes washing costs, and the later part sets the deposit amount using those costs.",
        },
        {
          isCorrect: false,
          label:
            "The first part declares total failure, and the later part ends refunds for festival visitors.",
        },
        {
          isCorrect: false,
          label:
            "The first part relocates desks, and the later part compares results with data from the previous year’s festival.",
        },
        {
          isCorrect: false,
          label:
            "The first part proves complete success, and the later part describes permanent adoption without further evaluation.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Hasil awal menunjukkan potensi, masalah akses mengungkap ketimpangan, dan perbaikan layanan menguji penjelasan tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan biaya pencucian, lalu bagian berikutnya memilih jumlah uang jaminan berdasarkan biaya itu.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menyatakan sistem gagal total, lalu bagian berikutnya menghentikan pengembalian uang bagi pengunjung.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal memindahkan loket, lalu bagian berikutnya membandingkan hasil dengan data dari festival tahun sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membuktikan keberhasilan penuh, lalu bagian berikutnya hanya menjelaskan penerapan tetap tanpa evaluasi lagi.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
