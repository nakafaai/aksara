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
              text: "Mindestens ein Gericht ist nicht zugleich säuerlich und scharf",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mindestens ein Gericht ist weder säuerlich noch scharf",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Jedes Gericht enthält rohes Gemüse" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kein Gericht enthält rohes Gemüse" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Mindestens ein Gericht enthält kein rohes Gemüse und schmeckt säuerlich und scharf",
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
              text: "At least one dish is not both sour and spicy",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "At least one dish is neither sour nor spicy",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Every dish contains raw vegetables" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "No dish contains raw vegetables" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "At least one dish contains no raw vegetables and tastes sour and spicy",
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
            {
              kind: "text",
              text: "Sedikitnya satu hidangan tidak sekaligus asam dan pedas",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sedikitnya satu hidangan tidak asam dan tidak pedas",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Setiap hidangan mengandung sayuran mentah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidak ada hidangan yang mengandung sayuran mentah",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sedikitnya satu hidangan tidak mengandung sayuran mentah serta terasa asam dan pedas",
            },
          ],
        },
      ],
    },
  },
};

export default item;
