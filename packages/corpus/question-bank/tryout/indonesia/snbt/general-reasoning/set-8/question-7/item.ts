import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jedes Bauteil in Regal C hat die Erstprüfung bestanden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ein Bauteil, das die Erstprüfung nicht besteht, durchläuft niemals die Belastungsprüfung.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Jedes Bauteil mit blauem Siegel wird in Regal C abgelegt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nur Bauteile mit blauem Siegel durchlaufen die Belastungsprüfung.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jedes zunächst geprüfte Bauteil erhält ein blaues Siegel.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every component on rack C passed the initial inspection.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A component that fails the initial inspection never enters the durability test.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Every component with a blue seal is placed on rack C.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Only components with blue seals enter the durability test.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every component inspected initially receives a blue seal.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap komponen di rak C telah lolos pemeriksaan awal.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Komponen yang gagal dalam pemeriksaan awal tidak pernah menjalani uji ketahanan.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Setiap komponen bersegel biru ditempatkan di rak C.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Hanya komponen bersegel biru yang menjalani uji ketahanan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap komponen yang diperiksa pada tahap awal mendapat segel biru.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
