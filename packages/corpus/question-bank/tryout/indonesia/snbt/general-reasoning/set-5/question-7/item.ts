import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Karte zeigt einen hohen Wassergehalt" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Karte zeigt wenige Kohlenhydrate" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Die Karte zeigt kein Fett" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die Karte zeigt, dass die Frucht Fett liefert",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Karte zeigt keinen hohen Kohlenhydratgehalt",
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
          label: [{ kind: "text", text: "The card shows high water" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The card shows low carbohydrates" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The card shows no fat" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The card shows that the fruit provides fat",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The card does not show high carbohydrates" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kartu menunjukkan kadar air tinggi" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kartu menunjukkan karbohidrat rendah" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kartu menunjukkan tidak ada lemak" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Kartu menunjukkan buah tersebut memberikan lemak",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kartu tidak menunjukkan karbohidrat tinggi",
            },
          ],
        },
      ],
    },
  },
};

export default item;
