import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

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
            "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der vier oben genannten Optionen zu entscheiden",
        },
        {
          isCorrect: true,
          label: "$$P < Q$$",
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
            "The information provided is not sufficient to decide on one of the four options above",
        },
        {
          isCorrect: true,
          label: "$$P < Q$$",
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
            "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari empat pilihan di atas",
        },
        {
          isCorrect: true,
          label: "$$P < Q$$",
        },
      ],
    },
  },
};

export default item;
