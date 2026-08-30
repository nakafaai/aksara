import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P > Q" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "Q > P" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = 2Q" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der drei oben genannten Optionen zu entscheiden",
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
          label: [{ display: "block", kind: "math", math: "P > Q" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "Q > P" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = 2Q" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The information provided is not sufficient to decide one of the three options above",
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
          label: [{ display: "block", kind: "math", math: "P > Q" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "Q > P" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = 2Q" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari tiga pilihan di atas",
            },
          ],
        },
      ],
    },
  },
};

export default item;
