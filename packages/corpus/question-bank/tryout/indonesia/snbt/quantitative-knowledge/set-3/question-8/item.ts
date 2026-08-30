import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P > Q" }],
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
              text: "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der vier oben genannten Optionen zu entscheiden",
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
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P > Q" }],
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
              text: "The information provided is not sufficient to decide on one of the four options above",
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
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P > Q" }],
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
              text: "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari empat pilihan di atas",
            },
          ],
        },
      ],
    },
  },
};

export default item;
