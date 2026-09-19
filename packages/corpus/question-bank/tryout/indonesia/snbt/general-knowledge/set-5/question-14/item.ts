import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Verspätungsmuster begründen zwei Vorschläge, Testergebnisse und Kommunikationsprobleme bestimmen die nächste Fassung.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil zeigt gleiche Folgen aller Verspätungen, der folgende verhängt dieselben Sperren für alle Nutzer.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil vergleicht Gebühreneinnahmen, der folgende wählt den Vorschlag mit den höchsten Einnahmen.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil testet zwei Erinnerungswege, der folgende beendet den Test, weil nun alle Nutzer Nachrichten erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil legt die neue Regel endgültig fest, der folgende erklärt nur die Zahlung der Gebühren.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Delay patterns motivate two proposals, and trial results plus communication problems shape the next design.",
        },
        {
          isCorrect: false,
          label:
            "The first part shows that all delays have equal effects, and the later part imposes identical restrictions on every user.",
        },
        {
          isCorrect: false,
          label:
            "The first part compares fine revenue, and the later part chooses the proposal that collects the most money.",
        },
        {
          isCorrect: false,
          label:
            "The first part tests two reminder channels, and the later part ends testing because every user now receives messages.",
        },
        {
          isCorrect: false,
          label:
            "The first part fixes the new policy as final, and the later part only explains how to pay fines.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pola keterlambatan menjadi dasar dua usulan, lalu hasil uji dan masalah komunikasi membentuk rancangan lanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menunjukkan semua keterlambatan berdampak sama, lalu bagian berikutnya menerapkan pembatasan yang sama kepada semua pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan pendapatan denda, lalu bagian berikutnya memilih usulan dengan penerimaan uang terbesar.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menguji dua saluran pengingat, lalu bagian berikutnya menghentikan uji karena semua pengguna sudah menerima pesan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan aturan baru sebagai keputusan final, lalu bagian berikutnya hanya menjelaskan cara membayar denda.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
