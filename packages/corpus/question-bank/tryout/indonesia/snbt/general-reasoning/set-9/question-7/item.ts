import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bei Nettoablagerung können Sedimente und Nährstoffe in der Aue zurückgehalten werden",
        },
        {
          isCorrect: false,
          label: "Erosion kann Sedimente und Nährstoffe aus der Aue forttragen",
        },
        {
          isCorrect: false,
          label:
            "Die Wirkung einer Überflutung hängt unter anderem vom Verhältnis zwischen Ablagerung und Erosion ab",
        },
        {
          isCorrect: true,
          label: "Jede saisonale Überschwemmung verbessert immer jeden Boden",
        },
        {
          isCorrect: false,
          label:
            "Zurückgehaltene Nährstoffe können das Pflanzenwachstum unterstützen, wenn die Ablagerung überwiegt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Net deposition can retain sediment and nutrients on a floodplain",
        },
        {
          isCorrect: false,
          label:
            "Erosion can carry sediment and nutrients away from a floodplain",
        },
        {
          isCorrect: false,
          label:
            "The effect of inundation depends partly on the balance between deposition and erosion",
        },
        {
          isCorrect: true,
          label: "Every seasonal flood always improves every soil",
        },
        {
          isCorrect: false,
          label:
            "Retained nutrients can support plant growth where deposition exceeds erosion",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengendapan bersih dapat menahan sedimen dan unsur hara di dataran banjir",
        },
        {
          isCorrect: false,
          label:
            "Erosi dapat membawa sedimen dan unsur hara keluar dari dataran banjir",
        },
        {
          isCorrect: false,
          label:
            "Dampak genangan antara lain bergantung pada keseimbangan pengendapan dan erosi",
        },
        {
          isCorrect: true,
          label: "Setiap banjir musiman selalu memperbaiki setiap tanah",
        },
        {
          isCorrect: false,
          label:
            "Unsur hara yang tertahan dapat mendukung pertumbuhan tanaman jika pengendapan melebihi erosi",
        },
      ],
    },
  },
};

export default item;
