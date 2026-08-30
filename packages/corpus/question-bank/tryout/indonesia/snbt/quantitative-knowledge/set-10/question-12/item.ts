import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$48$$ Tage",
        },
        {
          isCorrect: false,
          label: "$$48{,}5$$ Tage",
        },
        {
          isCorrect: false,
          label: "$$49$$ Tage",
        },
        {
          isCorrect: true,
          label: "$$49{,}5$$ Tage",
        },
        {
          isCorrect: false,
          label: "$$50$$ Tage",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$48$$ days" },
        { isCorrect: false, label: "$$48.5$$ days" },
        { isCorrect: false, label: "$$49$$ days" },
        { isCorrect: true, label: "$$49.5$$ days" },
        { isCorrect: false, label: "$$50$$ days" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$48$$ hari" },
        { isCorrect: false, label: "$$48{,}5$$ hari" },
        { isCorrect: false, label: "$$49$$ hari" },
        { isCorrect: true, label: "$$49{,}5$$ hari" },
        { isCorrect: false, label: "$$50$$ hari" },
      ],
    },
  },
};

export default item;
