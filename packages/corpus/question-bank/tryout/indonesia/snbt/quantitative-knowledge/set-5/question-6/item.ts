import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
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
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P + Q = 1" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der Optionen zu entscheiden.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
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
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P + Q = 1" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The information provided is not sufficient to decide one of the options.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
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
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P + Q = 1" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Informasi yang diberikan tidak cukup untuk memutuskan salah satu pilihan.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
