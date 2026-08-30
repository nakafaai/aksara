import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Huhn" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rindfleisch" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kaninchen" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Lamm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Ente" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Chicken" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Beef" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Rabbit" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Lamb" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Duck" }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Ayam" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Sapi" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Kelinci" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Domba" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Bebek" }] },
      ],
    },
  },
};

export default item;
