import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Jedes Bauteil in Regal C hat die Erstprüfung bestanden.",
        },
        {
          isCorrect: true,
          label: "Jedes Bauteil mit blauem Siegel wird in Regal C abgelegt.",
        },
        {
          isCorrect: false,
          label:
            "Ein Bauteil, das die Erstprüfung nicht besteht, durchläuft niemals die Belastungsprüfung.",
        },
        {
          isCorrect: false,
          label:
            "Nur Bauteile mit blauem Siegel durchlaufen die Belastungsprüfung.",
        },
        {
          isCorrect: false,
          label: "Jedes zunächst geprüfte Bauteil erhält ein blaues Siegel.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every component on rack C passed the initial inspection.",
        },
        {
          isCorrect: true,
          label: "Every component with a blue seal is placed on rack C.",
        },
        {
          isCorrect: false,
          label:
            "A component that fails the initial inspection never enters the durability test.",
        },
        {
          isCorrect: false,
          label: "Only components with blue seals enter the durability test.",
        },
        {
          isCorrect: false,
          label: "Every component inspected initially receives a blue seal.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Setiap komponen di rak C telah lolos pemeriksaan awal.",
        },
        {
          isCorrect: true,
          label: "Setiap komponen bersegel biru ditempatkan di rak C.",
        },
        {
          isCorrect: false,
          label:
            "Komponen yang gagal dalam pemeriksaan awal tidak pernah menjalani uji ketahanan.",
        },
        {
          isCorrect: false,
          label: "Hanya komponen bersegel biru yang menjalani uji ketahanan.",
        },
        {
          isCorrect: false,
          label:
            "Setiap komponen yang diperiksa pada tahap awal mendapat segel biru.",
        },
      ],
    },
  },
};

export default item;
