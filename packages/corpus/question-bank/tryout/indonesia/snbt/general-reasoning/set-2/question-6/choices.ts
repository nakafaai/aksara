import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Der Verkauf von Hosen ist $$10$$ geringer als der von Hemden",
      value: false,
    },
    {
      label: "Der Verkauf von Anzügen ist $$35$$ höher als der von Hosen",
      value: false,
    },
    {
      label: "Zusammen werden weniger als $$70$$ Hemden und Hosen verkauft",
      value: true,
    },
    {
      label: "Der Verkauf von Hemden ist $$10$$ höher als der von Hosen",
      value: false,
    },
    {
      label: "Der Verkauf von Hosen ist $$35$$ geringer als der von Anzügen",
      value: false,
    },
  ],
  en: [
    { label: "Pants sales are $$10$$ fewer than shirts", value: false },
    { label: "Suits sales are $$35$$ more than pants", value: false },
    {
      label: "The combined number of shirts and pants sold is less than $$70$$",
      value: true,
    },
    { label: "Shirts sales are $$10$$ more than pants", value: false },
    { label: "Pants sales are $$35$$ less than suits", value: false },
  ],
  id: [
    { label: "Penjualan celana $$10$$ lebih sedikit dari baju", value: false },
    { label: "Penjualan jas $$35$$ lebih banyak dari celana", value: false },
    {
      label: "Jumlah penjualan baju dan celana kurang dari $$70$$",
      value: true,
    },
    { label: "Penjualan baju $$10$$ lebih banyak dari celana", value: false },
    { label: "Penjualan celana $$35$$ lebih sedikit dari jas", value: false },
  ],
};

export default choices;
