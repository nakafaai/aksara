import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1\\text{ Stunde}$$",
        },
        {
          isCorrect: false,
          label: "$$1\\text{ Stunde} 30\\text{ Minuten}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ Stunden}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ Stunden} 30\\text{ Minuten}$$",
        },
        {
          isCorrect: true,
          label: "$$3\\text{ Stunden}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1\\text{ hour}$$",
        },
        {
          isCorrect: false,
          label: "$$1\\text{ hour} 30\\text{ minutes}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ hours}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ hours} 30\\text{ minutes}$$",
        },
        {
          isCorrect: true,
          label: "$$3\\text{ hours}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1\\text{ jam}$$",
        },
        {
          isCorrect: false,
          label: "$$1\\text{ jam} 30\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ jam}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ jam} 30\\text{ menit}$$",
        },
        {
          isCorrect: true,
          label: "$$3\\text{ jam}$$",
        },
      ],
    },
  },
};

export default item;
