import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nutzerkorrekturen betrafen häufiger beliebte Sammlungen.",
        },
        {
          isCorrect: true,
          label:
            "Automatische Archivsuche ist nützlich, wenn ihre Ausgabe als begrenzter, prüf- und korrigierbarer Index gilt.",
        },
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
          label: "User corrections were more frequent for popular collections.",
        },
        {
          isCorrect: true,
          label:
            "Automated archive search is useful when its output is treated as a limited index that can be inspected and corrected.",
        },
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
            "Koreksi pengguna lebih sering diberikan pada koleksi populer.",
        },
        {
          isCorrect: true,
          label:
            "Pencarian arsip otomatis bermanfaat jika hasil diperlakukan sebagai indeks terbatas yang dapat diperiksa dan dikoreksi.",
        },
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
            "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
