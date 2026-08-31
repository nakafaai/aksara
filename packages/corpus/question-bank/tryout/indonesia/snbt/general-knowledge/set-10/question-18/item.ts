import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Wegen auftretender Fehler muss jede automatische Suche beendet werden.",
        },
        {
          isCorrect: false,
          label:
            "Ein in der automatischen Suche fehlendes Dokument ist sicher nicht im Archiv vorhanden.",
        },
        {
          isCorrect: false,
          label: "Nutzerkorrekturen betrafen häufiger beliebte Sammlungen.",
        },
        {
          isCorrect: true,
          label:
            "Ein leeres Suchergebnis belegt keine fehlende Quelle, wenn die Erkennung systematische Ausfälle hat.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird Leistungsunterschiede nach Schriftart und Zeitraum prüfen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because the system makes errors, all automated search must be stopped.",
        },
        {
          isCorrect: false,
          label:
            "A document absent from automated search is certainly not stored in the archive.",
        },
        {
          isCorrect: false,
          label: "User corrections were more frequent for popular collections.",
        },
        {
          isCorrect: true,
          label:
            "A zero search result is insufficient to conclude that a source is absent when recognition has patterned failures.",
        },
        {
          isCorrect: false,
          label:
            "The team will audit performance differences by writing type and period.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan.",
        },
        {
          isCorrect: false,
          label:
            "Dokumen yang tidak muncul dalam pencarian otomatis pasti tidak tersimpan di arsip.",
        },
        {
          isCorrect: false,
          label:
            "Koreksi pengguna lebih sering diberikan pada koleksi populer.",
        },
        {
          isCorrect: true,
          label:
            "Hasil pencarian nol tidak cukup untuk menyimpulkan ketiadaan sumber ketika proses pengenalan memiliki pola kegagalan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
