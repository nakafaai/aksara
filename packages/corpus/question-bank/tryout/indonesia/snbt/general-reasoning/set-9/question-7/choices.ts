import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Bei Nettoablagerung können Sedimente und Nährstoffe in der Aue zurückgehalten werden",
      value: false,
    },
    {
      label: "Erosion kann Sedimente und Nährstoffe aus der Aue forttragen",
      value: false,
    },
    {
      label:
        "Die Wirkung einer Überflutung hängt unter anderem vom Verhältnis zwischen Ablagerung und Erosion ab",
      value: false,
    },
    {
      label: "Jede saisonale Überschwemmung verbessert immer jeden Boden",
      value: true,
    },
    {
      label:
        "Zurückgehaltene Nährstoffe können das Pflanzenwachstum unterstützen, wenn die Ablagerung überwiegt",
      value: false,
    },
  ],
  en: [
    {
      label: "Net deposition can retain sediment and nutrients on a floodplain",
      value: false,
    },
    {
      label: "Erosion can carry sediment and nutrients away from a floodplain",
      value: false,
    },
    {
      label:
        "The effect of inundation depends partly on the balance between deposition and erosion",
      value: false,
    },
    {
      label: "Every seasonal flood always improves every soil",
      value: true,
    },
    {
      label:
        "Retained nutrients can support plant growth where deposition exceeds erosion",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Pengendapan bersih dapat menahan sedimen dan unsur hara di dataran banjir",
      value: false,
    },
    {
      label:
        "Erosi dapat membawa sedimen dan unsur hara keluar dari dataran banjir",
      value: false,
    },
    {
      label:
        "Dampak genangan antara lain bergantung pada keseimbangan pengendapan dan erosi",
      value: false,
    },
    {
      label: "Setiap banjir musiman selalu memperbaiki setiap tanah",
      value: true,
    },
    {
      label:
        "Unsur hara yang tertahan dapat mendukung pertumbuhan tanaman jika pengendapan melebihi erosi",
      value: false,
    },
  ],
};

export default choices;
