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
          isCorrect: true,
          label:
            "Automatisierung erweitert den Zugang, doch Ausgaben brauchen sichtbare Grenzen, Originalbelege und einen Revisionsweg.",
        },
        {
          isCorrect: false,
          label: "Nutzerkorrekturen betrafen häufiger beliebte Sammlungen.",
        },
        {
          isCorrect: false,
          label:
            "Automatisierung ist nützlich, weil sie Originalbilder durch Ausgaben ersetzt, die keiner weiteren Prüfung bedürfen.",
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
          isCorrect: true,
          label:
            "Automation broadens access, but output needs visible limits, original evidence, and a revision mechanism.",
        },
        {
          isCorrect: false,
          label: "User corrections were more frequent for popular collections.",
        },
        {
          isCorrect: false,
          label:
            "Automation is useful because it can replace original images with output that requires no further inspection.",
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
          isCorrect: true,
          label:
            "Otomatisasi memperluas akses, tetapi keluaran perlu disertai batas, bukti asli, dan mekanisme revisi.",
        },
        {
          isCorrect: false,
          label:
            "Koreksi pengguna lebih sering diberikan pada koleksi populer.",
        },
        {
          isCorrect: false,
          label:
            "Otomatisasi bermanfaat karena dapat menggantikan gambar asli dengan keluaran yang tidak perlu diperiksa lagi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
