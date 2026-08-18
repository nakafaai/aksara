import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "Every nutrient listed for jackfruit is higher than the corresponding value for pomelo.",
      value: false,
    },
    {
      label:
        "Every nutrient listed for avocado is higher than the corresponding value for pomelo.",
      value: false,
    },
    {
      label:
        "The total protein content of pomelo and jackfruit is higher than the total protein content of avocado and ambarella.",
      value: false,
    },
    {
      label:
        "The total calcium content of pomelo and avocado is lower than the total calcium content of ambarella and jackfruit.",
      value: true,
    },
    {
      label: "Jackfruit has the highest value for every nutrient listed.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Setiap zat gizi yang tercantum pada nangka lebih tinggi daripada nilai yang sama pada jeruk bali.",
      value: false,
    },
    {
      label:
        "Setiap zat gizi yang tercantum pada alpukat lebih tinggi daripada nilai yang sama pada jeruk bali.",
      value: false,
    },
    {
      label:
        "Jumlah kandungan protein jeruk bali dan nangka lebih tinggi dibandingkan jumlah kandungan protein alpukat dan kedondong.",
      value: false,
    },
    {
      label:
        "Jumlah kandungan kalsium jeruk bali dan alpukat lebih rendah dibandingkan jumlah kandungan kalsium kedondong dan nangka.",
      value: true,
    },
    {
      label:
        "Nangka memiliki nilai tertinggi untuk setiap zat gizi yang tercantum.",
      value: false,
    },
  ],
};

export default choices;
