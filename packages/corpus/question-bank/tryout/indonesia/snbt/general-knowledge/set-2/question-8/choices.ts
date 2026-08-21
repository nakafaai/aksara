import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "die Nährstoffe in Milch und Milcherzeugnissen.",
      value: false,
    },
    {
      label: "Jeder Mensch sollte dieselbe Menge Milcherzeugnisse verzehren.",
      value: false,
    },
    {
      label: "Laktase wandelt Laktose im Dickdarm in Gas um.",
      value: false,
    },
    {
      label:
        "Menschen verdauen Laktose unterschiedlich, und ein niedriger Laktasespiegel kann eine Malabsorption verursachen.",
      value: true,
    },
    {
      label: "Fermentierte Milcherzeugnisse sind immer laktosefrei.",
      value: false,
    },
  ],
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
