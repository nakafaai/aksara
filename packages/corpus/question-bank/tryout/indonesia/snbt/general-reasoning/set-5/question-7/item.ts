import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Karte zeigt einen hohen Wassergehalt",
        },
        {
          isCorrect: false,
          label: "Die Karte zeigt wenige Kohlenhydrate",
        },
        {
          isCorrect: false,
          label: "Die Karte zeigt einen niedrigen Fettgehalt",
        },
        {
          isCorrect: false,
          label: "Die Karte zeigt keinen hohen Kohlenhydratgehalt",
        },
        {
          isCorrect: true,
          label: "Die Karte zeigt einen hohen Fettgehalt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The card shows high water",
        },
        {
          isCorrect: false,
          label: "The card shows low carbohydrates",
        },
        {
          isCorrect: false,
          label: "The card shows low fat",
        },
        {
          isCorrect: false,
          label: "The card does not show high carbohydrates",
        },
        {
          isCorrect: true,
          label: "The card shows high fat",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kartu menunjukkan kadar air tinggi",
        },
        {
          isCorrect: false,
          label: "Kartu menunjukkan karbohidrat rendah",
        },
        {
          isCorrect: false,
          label: "Kartu menunjukkan kadar lemak rendah",
        },
        {
          isCorrect: false,
          label: "Kartu tidak menunjukkan karbohidrat tinggi",
        },
        {
          isCorrect: true,
          label: "Kartu menunjukkan kadar lemak tinggi",
        },
      ],
    },
  },
};

export default item;
