import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = 2Q$$",
        },
        {
          isCorrect: false,
          label:
            "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der drei oben genannten Optionen zu entscheiden",
        },
        {
          isCorrect: true,
          label: "$$Q > P$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = 2Q$$",
        },
        {
          isCorrect: false,
          label:
            "The information provided is not sufficient to decide one of the three options above",
        },
        {
          isCorrect: true,
          label: "$$Q > P$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = 2Q$$",
        },
        {
          isCorrect: false,
          label:
            "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari tiga pilihan di atas",
        },
        {
          isCorrect: true,
          label: "$$Q > P$$",
        },
      ],
    },
  },
};

export default item;
