import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der Klimawandel hat die Ernährungssicherheit bereits beeinträchtigt",
        },
        {
          isCorrect: false,
          label:
            "Seine Auswirkungen können je nach Nutzpflanze und Region unterschiedlich ausfallen",
        },
        {
          isCorrect: false,
          label:
            "Mehr Kohlendioxid in der Atmosphäre kann die Nährstoffkonzentration mancher Nutzpflanzen verringern",
        },
        {
          isCorrect: true,
          label:
            "Mehr Kohlendioxid in der Atmosphäre kann Wachstum und Ertrag von Nutzpflanzen nur verringern",
        },
        {
          isCorrect: false,
          label:
            "Höhere Temperaturen, veränderte Niederschläge und Extremereignisse können die Ernährungssicherheit beeinträchtigen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Climate change has already affected food security",
        },
        {
          isCorrect: false,
          label: "Its effects can differ by crop and region",
        },
        {
          isCorrect: false,
          label:
            "More atmospheric carbon dioxide can reduce nutrient concentrations in some crops",
        },
        {
          isCorrect: true,
          label:
            "More atmospheric carbon dioxide can only reduce crop growth and yield",
        },
        {
          isCorrect: false,
          label:
            "Higher temperatures, changing rainfall, and extreme events can affect food security",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Perubahan iklim telah memengaruhi ketahanan pangan",
        },
        {
          isCorrect: false,
          label: "Dampaknya dapat berbeda menurut tanaman dan wilayah",
        },
        {
          isCorrect: false,
          label:
            "Karbon dioksida atmosfer yang lebih tinggi dapat menurunkan kadar zat gizi pada sebagian tanaman",
        },
        {
          isCorrect: true,
          label:
            "Karbon dioksida atmosfer yang lebih tinggi hanya dapat menurunkan pertumbuhan dan hasil tanaman",
        },
        {
          isCorrect: false,
          label:
            "Kenaikan suhu, perubahan curah hujan, dan kejadian ekstrem dapat memengaruhi ketahanan pangan",
        },
      ],
    },
  },
};

export default item;
