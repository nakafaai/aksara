import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$ Stunde $$15$$ Minuten",
        },
        {
          isCorrect: true,
          label: "$$1$$ Stunde $$20$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$1$$ Stunde $$30$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$1$$ Stunde $$40$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$1$$ Stunde $$45$$ Minuten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$ hour $$15$$ minutes",
        },
        {
          isCorrect: true,
          label: "$$1$$ hour $$20$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$1$$ hour $$30$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$1$$ hour $$40$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$1$$ hour $$45$$ minutes",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$ jam $$15$$ menit",
        },
        {
          isCorrect: true,
          label: "$$1$$ jam $$20$$ menit",
        },
        {
          isCorrect: false,
          label: "$$1$$ jam $$30$$ menit",
        },
        {
          isCorrect: false,
          label: "$$1$$ jam $$40$$ menit",
        },
        {
          isCorrect: false,
          label: "$$1$$ jam $$45$$ menit",
        },
      ],
    },
  },
};

export default item;
