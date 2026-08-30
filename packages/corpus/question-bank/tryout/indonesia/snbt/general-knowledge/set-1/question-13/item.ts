import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Fläche war mit Eiskristallen bedeckt.",
        },
        {
          isCorrect: true,
          label: "Die Besucher waren fasziniert.",
        },
        {
          isCorrect: false,
          label: "Sie waren mit Eiskristallen bedeckt.",
        },
        {
          isCorrect: false,
          label: "Fasziniert von der Schönheit der Weite der Eiskristalle",
        },
        {
          isCorrect: false,
          label: "Bedeckt mit klaren Eiskristallen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The expanse was covered in ice crystals.",
        },
        {
          isCorrect: true,
          label: "Visitors were fascinated.",
        },
        {
          isCorrect: false,
          label: "They were covered in ice crystals.",
        },
        {
          isCorrect: false,
          label: "Fascinated by the beauty of the expanse of ice crystals",
        },
        {
          isCorrect: false,
          label: "Covered in clear ice crystals.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Hamparan diselimuti kristal es.",
        },
        {
          isCorrect: true,
          label: "Para pengunjung terpesona.",
        },
        {
          isCorrect: false,
          label: "Mereka diselimuti kristal es.",
        },
        {
          isCorrect: false,
          label: "Terpesona kecantikan hamparan kristal es",
        },
        {
          isCorrect: false,
          label: "Diselimuti kristal es bening.",
        },
      ],
    },
  },
};

export default item;
