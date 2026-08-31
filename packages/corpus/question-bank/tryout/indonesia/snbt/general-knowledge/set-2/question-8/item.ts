import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Menschen verdauen Laktose unterschiedlich, und ein niedriger Laktasespiegel kann eine Malabsorption verursachen.",
        },
        {
          isCorrect: false,
          label: "die Nährstoffe in Milch und Milcherzeugnissen.",
        },
        {
          isCorrect: false,
          label:
            "Jeder Mensch sollte dieselbe Menge Milcherzeugnisse verzehren.",
        },
        {
          isCorrect: false,
          label: "Laktase wandelt Laktose im Dickdarm in Gas um.",
        },
        {
          isCorrect: false,
          label: "Fermentierte Milcherzeugnisse sind immer laktosefrei.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "people digest lactose differently, and low lactase can cause malabsorption.",
        },
        {
          isCorrect: false,
          label: "the nutrients supplied by milk and dairy foods.",
        },
        {
          isCorrect: false,
          label: "everyone should consume the same amount of dairy.",
        },
        {
          isCorrect: false,
          label: "lactase turns lactose into gas in the colon.",
        },
        {
          isCorrect: false,
          label: "fermented dairy products are always lactose-free.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "kemampuan mencerna laktosa berbeda, dan kadar laktase rendah dapat menyebabkan malabsorpsi.",
        },
        {
          isCorrect: false,
          label: "zat gizi yang disediakan susu dan produk olahannya.",
        },
        {
          isCorrect: false,
          label:
            "setiap orang harus mengonsumsi produk susu dalam jumlah yang sama.",
        },
        {
          isCorrect: false,
          label: "laktase mengubah laktosa menjadi gas di usus besar.",
        },
        {
          isCorrect: false,
          label: "produk susu fermentasi selalu bebas laktosa.",
        },
      ],
    },
  },
};

export default item;
