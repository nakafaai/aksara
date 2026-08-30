import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Die Besucher waren fasziniert." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Fläche war mit Eiskristallen bedeckt." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Sie waren mit Eiskristallen bedeckt." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Fasziniert von der Schönheit der Weite der Eiskristalle",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Bedeckt mit klaren Eiskristallen." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Visitors were fascinated." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The expanse was covered in ice crystals." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "They were covered in ice crystals." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Fascinated by the beauty of the expanse of ice crystals",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Covered in clear ice crystals." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Para pengunjung terpesona." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Hamparan diselimuti kristal es." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Mereka diselimuti kristal es." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Terpesona kecantikan hamparan kristal es" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Diselimuti kristal es bening." }],
        },
      ],
    },
  },
};

export default item;
