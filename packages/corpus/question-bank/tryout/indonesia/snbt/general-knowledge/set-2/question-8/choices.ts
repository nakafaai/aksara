import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "the nutrients supplied by milk and dairy foods.",
      value: false,
    },
    {
      label: "everyone should consume the same amount of dairy.",
      value: false,
    },
    {
      label: "lactase turns lactose into gas in the colon.",
      value: false,
    },
    {
      label:
        "people digest lactose differently, and low lactase can cause malabsorption.",
      value: true,
    },
    {
      label: "fermented dairy products are always lactose-free.",
      value: false,
    },
  ],
  id: [
    {
      label: "zat gizi yang disediakan susu dan produk olahannya.",
      value: false,
    },
    {
      label:
        "setiap orang harus mengonsumsi produk susu dalam jumlah yang sama.",
      value: false,
    },
    {
      label: "laktase mengubah laktosa menjadi gas di usus besar.",
      value: false,
    },
    {
      label:
        "kemampuan mencerna laktosa berbeda, dan kadar laktase rendah dapat menyebabkan malabsorpsi.",
      value: true,
    },
    {
      label: "produk susu fermentasi selalu bebas laktosa.",
      value: false,
    },
  ],
};

export default choices;
