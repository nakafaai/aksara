import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "wuchs." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "entwickelte sich." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "nahm ab." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "stieg." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "erhöhte sich." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "growth." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "progressive." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "decreased." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "climbing." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "rising." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "pertumbuhan." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "progresif." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "menurun." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "menaiki." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "meninggi." }],
        },
      ],
    },
  },
};

export default item;
