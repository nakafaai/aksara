import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Automatische Archivsuche ist nützlich, wenn ihre Ausgabe als begrenzter, prüf- und korrigierbarer Index gilt.",
        },
        {
          isCorrect: false,
          label:
            "Die Verantwortlichen könnten nur maschinenlesbare Dokumente anzeigen, damit Suchergebnisse sauber wirken.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird Leistungsunterschiede nach Schriftart und Zeitraum prüfen.",
        },
        {
          isCorrect: true,
          label:
            "Getippte Briefe waren leichter auffindbar als Handschriften, und alte Schreibweisen erschienen oft nicht.",
        },
        {
          isCorrect: false,
          label:
            "Wegen auftretender Fehler muss jede automatische Suche beendet werden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Automated archive search is useful when its output is treated as a limited index that can be inspected and corrected.",
        },
        {
          isCorrect: false,
          label:
            "Managers could display only machine-readable documents so search results appear clean.",
        },
        {
          isCorrect: false,
          label:
            "The team will audit performance differences by writing type and period.",
        },
        {
          isCorrect: true,
          label:
            "Typed letters were easier to find than handwritten notes, and historical spellings often failed to appear.",
        },
        {
          isCorrect: false,
          label:
            "Because the system makes errors, all automated search must be stopped.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pencarian arsip otomatis bermanfaat jika hasil diperlakukan sebagai indeks terbatas yang dapat diperiksa dan dikoreksi.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola dapat menampilkan hanya dokumen yang mudah dibaca mesin agar hasil pencarian tampak bersih.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode.",
        },
        {
          isCorrect: true,
          label:
            "Surat ketikan lebih mudah ditemukan daripada catatan tangan dan ejaan lama sering tidak muncul.",
        },
        {
          isCorrect: false,
          label:
            "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
