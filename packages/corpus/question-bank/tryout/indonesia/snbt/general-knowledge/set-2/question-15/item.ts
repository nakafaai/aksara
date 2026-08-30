import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der **Abstellraum** wurde gestern gereinigt.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die **Zeichnung** wird morgen ausgestellt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Der **Tanz** beginnt mittags." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Sie hörte einen **Ruf** von hinten." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Künstlerin erhielt **Lob** für ihr neues Werk.",
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
          label: [
            {
              kind: "text",
              text: "The **storage room** was cleaned yesterday.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The **drawing** will be displayed tomorrow.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The **dance** begins at noon." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "She heard a **call** from behind." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The artist received **praise** for the new work.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "**Ruangan** itu dibersihkan kemarin." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "**Tulisan** itu akan segera diterbitkan." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "**Tarian** itu dimulai siang hari." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ia mendengar **panggilan** dari arah belakang.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Seniman itu menerima **pujian** atas karya barunya.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
