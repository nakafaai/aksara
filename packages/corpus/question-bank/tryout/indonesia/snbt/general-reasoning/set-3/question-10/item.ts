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
              text: "Jeder für die Jackfrucht angegebene Nährstoffwert ist höher als der entsprechende Wert der Pomelo.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jeder für die Avocado angegebene Nährstoffwert ist höher als der entsprechende Wert der Pomelo.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Gesamtproteingehalt von Pampelmuse und Jackfrucht ist höher als der Gesamtproteingehalt von Avocado und Ambarella.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Der Gesamtkalziumgehalt von Pampelmuse und Avocado ist niedriger als der Gesamtkalziumgehalt von Ambarella und Jackfrucht.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Jackfrucht hat bei jedem aufgeführten Nährstoff den höchsten Wert.",
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
              text: "Every nutrient listed for jackfruit is higher than the corresponding value for pomelo.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every nutrient listed for avocado is higher than the corresponding value for pomelo.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The total protein content of pomelo and jackfruit is higher than the total protein content of avocado and ambarella.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The total calcium content of pomelo and avocado is lower than the total calcium content of ambarella and jackfruit.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jackfruit has the highest value for every nutrient listed.",
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
              text: "Setiap zat gizi yang tercantum pada nangka lebih tinggi daripada nilai yang sama pada jeruk bali.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap zat gizi yang tercantum pada alpukat lebih tinggi daripada nilai yang sama pada jeruk bali.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jumlah kandungan protein jeruk bali dan nangka lebih tinggi dibandingkan jumlah kandungan protein alpukat dan kedondong.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Jumlah kandungan kalsium jeruk bali dan alpukat lebih rendah dibandingkan jumlah kandungan kalsium kedondong dan nangka.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nangka memiliki nilai tertinggi untuk setiap zat gizi yang tercantum.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
