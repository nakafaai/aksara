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
          label: "Die Karte zeigt kein Fett",
        },
        {
          isCorrect: false,
          label: "Die Karte zeigt keinen hohen Kohlenhydratgehalt",
        },
        {
          isCorrect: true,
          label: "Die Karte zeigt, dass die Frucht Fett liefert",
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
          label: "The card shows no fat",
        },
        {
          isCorrect: false,
          label: "The card does not show high carbohydrates",
        },
        {
          isCorrect: true,
          label: "The card shows that the fruit provides fat",
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
          label: "Kartu menunjukkan tidak ada lemak",
        },
        {
          isCorrect: false,
          label: "Kartu tidak menunjukkan karbohidrat tinggi",
        },
        {
          isCorrect: true,
          label: "Kartu menunjukkan buah tersebut memberikan lemak",
        },
      ],
    },
  },
};

export default item;
