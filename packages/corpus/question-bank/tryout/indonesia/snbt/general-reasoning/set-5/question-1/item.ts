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
              text: "Mehr Verbraucher entscheiden sich für Hühnereier",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Preis steigt in der folgenden Woche erneut",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Mehrere Vertriebswege bleiben gestört" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Eierproduktion sinkt, während die Nachfrage weiter steigt",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Produktion und Auslieferung steigen so weit, dass die zusätzliche Nachfrage gedeckt wird",
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
          label: [{ kind: "text", text: "More consumers choose chicken eggs" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The price rises again the following week" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Several distribution routes remain disrupted",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Egg production falls while demand continues to rise",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Egg output and deliveries increase enough to meet the extra demand",
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
              text: "Semakin banyak konsumen memilih telur ayam",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Harga kembali naik pada pekan berikutnya" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Beberapa jalur distribusi masih tersendat" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Produksi telur turun sementara permintaan terus meningkat",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Produksi dan pengiriman telur meningkat hingga cukup memenuhi tambahan permintaan",
            },
          ],
        },
      ],
    },
  },
};

export default item;
