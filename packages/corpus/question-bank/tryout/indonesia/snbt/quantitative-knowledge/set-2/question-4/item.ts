import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$Q > P$$",
        },
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
            "Die Beziehung zwischen $$P$$ und $$Q$$ lässt sich aus den Angaben nicht bestimmen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$Q > P$$",
        },
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
            "The relationship between $$P$$ and $$Q$$ cannot be determined from the information given.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$Q > P$$",
        },
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
            "Hubungan antara $$P$$ dan $$Q$$ tidak dapat ditentukan dari informasi yang diberikan.",
        },
      ],
    },
  },
};

export default item;
