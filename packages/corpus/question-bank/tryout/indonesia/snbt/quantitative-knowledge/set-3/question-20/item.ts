import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

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
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der drei oben genannten Optionen zu entscheiden",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = 2Q" }],
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
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The information provided is not sufficient to decide on one of the three options above",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = 2Q" }],
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
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari tiga pilihan di atas",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = 2Q" }],
        },
      ],
    },
  },
};

export default item;
