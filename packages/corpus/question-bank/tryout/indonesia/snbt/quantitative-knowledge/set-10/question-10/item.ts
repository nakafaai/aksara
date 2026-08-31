import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$15$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$30$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$45$$ Minuten",
        },
        {
          isCorrect: true,
          label: "$$60$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$75$$ Minuten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$15$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$30$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$45$$ minutes",
        },
        {
          isCorrect: true,
          label: "$$60$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$75$$ minutes",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$15$$ menit",
        },
        {
          isCorrect: false,
          label: "$$30$$ menit",
        },
        {
          isCorrect: false,
          label: "$$45$$ menit",
        },
        {
          isCorrect: true,
          label: "$$60$$ menit",
        },
        {
          isCorrect: false,
          label: "$$75$$ menit",
        },
      ],
    },
  },
};

export default item;
