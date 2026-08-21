import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Miras Bericht gelangt in die Warteschlange für die endgültige Entscheidung.",
      value: true,
    },
    {
      label: "Miras Bericht hat die Vollständigkeitsprüfung nicht bestanden.",
      value: false,
    },
    { label: "Miras Antrag wurde bereits genehmigt.", value: false },
    {
      label: "Die fachliche Prüfung wird bei Miras Bericht übersprungen.",
      value: false,
    },
    {
      label:
        "Jeder Bericht in der endgültigen Warteschlange wird automatisch genehmigt.",
      value: false,
    },
  ],
  en: [
    { label: "Mira's report enters the final decision queue.", value: true },
    { label: "Mira's report failed the completeness check.", value: false },
    { label: "Mira's application has already been approved.", value: false },
    { label: "The analyst review is skipped for Mira's report.", value: false },
    {
      label: "Every report in the final queue is automatically approved.",
      value: false,
    },
  ],
  id: [
    { label: "Laporan Mira masuk ke antrean keputusan akhir.", value: true },
    {
      label: "Laporan Mira tidak lulus pemeriksaan kelengkapan.",
      value: false,
    },
    { label: "Pengajuan Mira sudah disetujui.", value: false },
    { label: "Penelaahan analis dilewati untuk laporan Mira.", value: false },
    {
      label: "Setiap laporan dalam antrean akhir disetujui secara otomatis.",
      value: false,
    },
  ],
};

export default choices;
