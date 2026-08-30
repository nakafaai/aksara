import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jeder für die Jackfrucht angegebene Nährstoffwert ist höher als der entsprechende Wert der Pomelo.",
        },
        {
          isCorrect: false,
          label:
            "Jeder für die Avocado angegebene Nährstoffwert ist höher als der entsprechende Wert der Pomelo.",
        },
        {
          isCorrect: false,
          label:
            "Der Gesamtproteingehalt von Pampelmuse und Jackfrucht ist höher als der Gesamtproteingehalt von Avocado und Ambarella.",
        },
        {
          isCorrect: false,
          label:
            "Die Jackfrucht hat bei jedem aufgeführten Nährstoff den höchsten Wert.",
        },
        {
          isCorrect: true,
          label:
            "Der Gesamtkalziumgehalt von Pampelmuse und Avocado ist niedriger als der Gesamtkalziumgehalt von Ambarella und Jackfrucht.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every nutrient listed for jackfruit is higher than the corresponding value for pomelo.",
        },
        {
          isCorrect: false,
          label:
            "Every nutrient listed for avocado is higher than the corresponding value for pomelo.",
        },
        {
          isCorrect: false,
          label:
            "The total protein content of pomelo and jackfruit is higher than the total protein content of avocado and ambarella.",
        },
        {
          isCorrect: false,
          label: "Jackfruit has the highest value for every nutrient listed.",
        },
        {
          isCorrect: true,
          label:
            "The total calcium content of pomelo and avocado is lower than the total calcium content of ambarella and jackfruit.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap zat gizi yang tercantum pada nangka lebih tinggi daripada nilai yang sama pada jeruk bali.",
        },
        {
          isCorrect: false,
          label:
            "Setiap zat gizi yang tercantum pada alpukat lebih tinggi daripada nilai yang sama pada jeruk bali.",
        },
        {
          isCorrect: false,
          label:
            "Jumlah kandungan protein jeruk bali dan nangka lebih tinggi dibandingkan jumlah kandungan protein alpukat dan kedondong.",
        },
        {
          isCorrect: false,
          label:
            "Nangka memiliki nilai tertinggi untuk setiap zat gizi yang tercantum.",
        },
        {
          isCorrect: true,
          label:
            "Jumlah kandungan kalsium jeruk bali dan alpukat lebih rendah dibandingkan jumlah kandungan kalsium kedondong dan nangka.",
        },
      ],
    },
  },
};

export default item;
