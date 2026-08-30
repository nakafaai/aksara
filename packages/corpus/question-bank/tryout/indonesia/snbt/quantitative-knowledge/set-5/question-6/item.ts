import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$P + Q = 1$$",
        },
        {
          isCorrect: false,
          label:
            "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der Optionen zu entscheiden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$P > Q$$" },
        { isCorrect: false, label: "$$P < Q$$" },
        { isCorrect: false, label: "$$P = Q$$" },
        { isCorrect: false, label: "$$P + Q = 1$$" },
        {
          isCorrect: false,
          label:
            "The information provided is not sufficient to decide one of the options.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$P > Q$$" },
        { isCorrect: false, label: "$$P < Q$$" },
        { isCorrect: false, label: "$$P = Q$$" },
        { isCorrect: false, label: "$$P + Q = 1$$" },
        {
          isCorrect: false,
          label:
            "Informasi yang diberikan tidak cukup untuk memutuskan salah satu pilihan.",
        },
      ],
    },
  },
};

export default item;
