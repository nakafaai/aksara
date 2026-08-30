import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0{,}15$$ Teil",
        },
        {
          isCorrect: false,
          label: "$$0{,}3$$ Teil",
        },
        {
          isCorrect: false,
          label: "$$0{,}45$$ Teil",
        },
        {
          isCorrect: false,
          label: "$$0{,}6$$ Teil",
        },
        {
          isCorrect: true,
          label: "$$0{,}75$$ Teil",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$0.15$$ part" },
        { isCorrect: false, label: "$$0.3$$ part" },
        { isCorrect: false, label: "$$0.45$$ part" },
        { isCorrect: false, label: "$$0.6$$ part" },
        { isCorrect: true, label: "$$0.75$$ part" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$0{,}15$$ bagian" },
        { isCorrect: false, label: "$$0{,}3$$ bagian" },
        { isCorrect: false, label: "$$0{,}45$$ bagian" },
        { isCorrect: false, label: "$$0{,}6$$ bagian" },
        { isCorrect: true, label: "$$0{,}75$$ bagian" },
      ],
    },
  },
};

export default item;
