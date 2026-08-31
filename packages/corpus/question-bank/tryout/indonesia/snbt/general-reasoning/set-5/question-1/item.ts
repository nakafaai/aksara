import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mehr Verbraucher entscheiden sich für Hühnereier",
        },
        {
          isCorrect: false,
          label: "Der Preis steigt in der folgenden Woche erneut",
        },
        {
          isCorrect: false,
          label: "Mehrere Vertriebswege bleiben gestört",
        },
        {
          isCorrect: false,
          label:
            "Die Eierproduktion sinkt, während die Nachfrage weiter steigt",
        },
        {
          isCorrect: true,
          label:
            "Produktion und Auslieferung steigen so weit, dass die zusätzliche Nachfrage gedeckt wird",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "More consumers choose chicken eggs",
        },
        {
          isCorrect: false,
          label: "The price rises again the following week",
        },
        {
          isCorrect: false,
          label: "Several distribution routes remain disrupted",
        },
        {
          isCorrect: false,
          label: "Egg production falls while demand continues to rise",
        },
        {
          isCorrect: true,
          label:
            "Egg output and deliveries increase enough to meet the extra demand",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Semakin banyak konsumen memilih telur ayam",
        },
        {
          isCorrect: false,
          label: "Harga kembali naik pada pekan berikutnya",
        },
        {
          isCorrect: false,
          label: "Beberapa jalur distribusi masih tersendat",
        },
        {
          isCorrect: false,
          label: "Produksi telur turun sementara permintaan terus meningkat",
        },
        {
          isCorrect: true,
          label:
            "Produksi dan pengiriman telur meningkat hingga cukup memenuhi tambahan permintaan",
        },
      ],
    },
  },
};

export default item;
