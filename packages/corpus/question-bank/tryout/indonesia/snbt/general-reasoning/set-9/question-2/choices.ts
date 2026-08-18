import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Climate change has already affected food security",
      value: false,
    },
    {
      label: "Its effects can differ by crop and region",
      value: false,
    },
    {
      label:
        "More atmospheric carbon dioxide can reduce nutrient concentrations in some crops",
      value: false,
    },
    {
      label:
        "More atmospheric carbon dioxide can only reduce crop growth and yield",
      value: true,
    },
    {
      label:
        "Higher temperatures, changing rainfall, and extreme events can affect food security",
      value: false,
    },
  ],
  id: [
    {
      label: "Perubahan iklim telah memengaruhi ketahanan pangan",
      value: false,
    },
    {
      label: "Dampaknya dapat berbeda menurut tanaman dan wilayah",
      value: false,
    },
    {
      label:
        "Karbon dioksida atmosfer yang lebih tinggi dapat menurunkan kadar zat gizi pada sebagian tanaman",
      value: false,
    },
    {
      label:
        "Karbon dioksida atmosfer yang lebih tinggi hanya dapat menurunkan pertumbuhan dan hasil tanaman",
      value: true,
    },
    {
      label:
        "Kenaikan suhu, perubahan curah hujan, dan kejadian ekstrem dapat memengaruhi ketahanan pangan",
      value: false,
    },
  ],
};

export default choices;
