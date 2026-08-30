import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "eine Stellungnahme oder Erklärung abgeben.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "etwas bestreiten." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "über einen Preis verhandeln." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "über etwas reden." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "etwas besprechen." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "providing an explanation or response." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "denying something." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "the activity of bargaining for something." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "talking about something." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "discussing something." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "memberikan penjelasan atau tanggapan." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "menyangkal sesuatu hal." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "kegiatan menawar sesuatu." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "membicarakan sesuatu hal." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "berdiskusi tentang sesuatu." }],
        },
      ],
    },
  },
};

export default item;
