import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$70$$ Minuten oder $$30$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$21$$ Minuten oder $$10$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$15$$ Minuten oder $$16$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$30$$ Minuten oder $$40$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$10$$ Minuten oder $$30$$ Minuten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$70$$ minutes or $$30$$ minutes" },
        { isCorrect: false, label: "$$21$$ minutes or $$10$$ minutes" },
        { isCorrect: false, label: "$$15$$ minutes or $$16$$ minutes" },
        { isCorrect: false, label: "$$30$$ minutes or $$40$$ minutes" },
        { isCorrect: false, label: "$$10$$ minutes or $$30$$ minutes" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$70$$ menit atau $$30$$ menit" },
        { isCorrect: false, label: "$$21$$ menit atau $$10$$ menit" },
        { isCorrect: false, label: "$$15$$ menit atau $$16$$ menit" },
        { isCorrect: false, label: "$$30$$ menit atau $$40$$ menit" },
        { isCorrect: false, label: "$$10$$ menit atau $$30$$ menit" },
      ],
    },
  },
};

export default item;
