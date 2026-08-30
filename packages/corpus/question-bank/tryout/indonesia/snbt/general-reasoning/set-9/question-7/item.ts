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
              text: "Bei Nettoablagerung können Sedimente und Nährstoffe in der Aue zurückgehalten werden",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Erosion kann Sedimente und Nährstoffe aus der Aue forttragen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Wirkung einer Überflutung hängt unter anderem vom Verhältnis zwischen Ablagerung und Erosion ab",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Jede saisonale Überschwemmung verbessert immer jeden Boden",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Zurückgehaltene Nährstoffe können das Pflanzenwachstum unterstützen, wenn die Ablagerung überwiegt",
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
              text: "Net deposition can retain sediment and nutrients on a floodplain",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Erosion can carry sediment and nutrients away from a floodplain",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The effect of inundation depends partly on the balance between deposition and erosion",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Every seasonal flood always improves every soil",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Retained nutrients can support plant growth where deposition exceeds erosion",
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
              text: "Pengendapan bersih dapat menahan sedimen dan unsur hara di dataran banjir",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Erosi dapat membawa sedimen dan unsur hara keluar dari dataran banjir",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dampak genangan antara lain bergantung pada keseimbangan pengendapan dan erosi",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Setiap banjir musiman selalu memperbaiki setiap tanah",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Unsur hara yang tertahan dapat mendukung pertumbuhan tanaman jika pengendapan melebihi erosi",
            },
          ],
        },
      ],
    },
  },
};

export default item;
