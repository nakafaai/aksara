import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "eine Stellungnahme oder Erklärung abgeben.",
        },
        {
          isCorrect: false,
          label: "etwas bestreiten.",
        },
        {
          isCorrect: false,
          label: "über einen Preis verhandeln.",
        },
        {
          isCorrect: false,
          label: "über etwas reden.",
        },
        {
          isCorrect: false,
          label: "etwas besprechen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "providing an explanation or response.",
        },
        {
          isCorrect: false,
          label: "denying something.",
        },
        {
          isCorrect: false,
          label: "the activity of bargaining for something.",
        },
        {
          isCorrect: false,
          label: "talking about something.",
        },
        {
          isCorrect: false,
          label: "discussing something.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "memberikan penjelasan atau tanggapan.",
        },
        {
          isCorrect: false,
          label: "menyangkal sesuatu hal.",
        },
        {
          isCorrect: false,
          label: "kegiatan menawar sesuatu.",
        },
        {
          isCorrect: false,
          label: "membicarakan sesuatu hal.",
        },
        {
          isCorrect: false,
          label: "berdiskusi tentang sesuatu.",
        },
      ],
    },
  },
};

export default item;
