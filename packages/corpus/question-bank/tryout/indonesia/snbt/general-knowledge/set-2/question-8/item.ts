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
              text: "die Nährstoffe in Milch und Milcherzeugnissen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jeder Mensch sollte dieselbe Menge Milcherzeugnisse verzehren.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Laktase wandelt Laktose im Dickdarm in Gas um.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Menschen verdauen Laktose unterschiedlich, und ein niedriger Laktasespiegel kann eine Malabsorption verursachen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Fermentierte Milcherzeugnisse sind immer laktosefrei.",
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
              text: "the nutrients supplied by milk and dairy foods.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "everyone should consume the same amount of dairy.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "lactase turns lactose into gas in the colon.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "people digest lactose differently, and low lactase can cause malabsorption.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "fermented dairy products are always lactose-free.",
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
              text: "zat gizi yang disediakan susu dan produk olahannya.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "setiap orang harus mengonsumsi produk susu dalam jumlah yang sama.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "laktase mengubah laktosa menjadi gas di usus besar.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "kemampuan mencerna laktosa berbeda, dan kadar laktase rendah dapat menyebabkan malabsorpsi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "produk susu fermentasi selalu bebas laktosa.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
