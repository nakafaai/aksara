import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Miras Bericht gelangt in die Warteschlange für die endgültige Entscheidung.",
        },
        {
          isCorrect: false,
          label:
            "Miras Bericht hat die Vollständigkeitsprüfung nicht bestanden.",
        },
        { isCorrect: false, label: "Miras Antrag wurde bereits genehmigt." },
        {
          isCorrect: false,
          label: "Die fachliche Prüfung wird bei Miras Bericht übersprungen.",
        },
        {
          isCorrect: false,
          label:
            "Jeder Bericht in der endgültigen Warteschlange wird automatisch genehmigt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Mira's report enters the final decision queue.",
        },
        {
          isCorrect: false,
          label: "Mira's report failed the completeness check.",
        },
        {
          isCorrect: false,
          label: "Mira's application has already been approved.",
        },
        {
          isCorrect: false,
          label: "The analyst review is skipped for Mira's report.",
        },
        {
          isCorrect: false,
          label: "Every report in the final queue is automatically approved.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Laporan Mira masuk ke antrean keputusan akhir.",
        },
        {
          isCorrect: false,
          label: "Laporan Mira tidak lulus pemeriksaan kelengkapan.",
        },
        { isCorrect: false, label: "Pengajuan Mira sudah disetujui." },
        {
          isCorrect: false,
          label: "Penelaahan analis dilewati untuk laporan Mira.",
        },
        {
          isCorrect: false,
          label:
            "Setiap laporan dalam antrean akhir disetujui secara otomatis.",
        },
      ],
    },
  },
};

export default item;
