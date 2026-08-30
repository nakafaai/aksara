import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\text{Rp}360{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}480{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}120{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}365{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}420{.}000{,}00$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$\\text{Rp}360{,}000.00$$" },
        { isCorrect: false, label: "$$\\text{Rp}480{,}000.00$$" },
        { isCorrect: false, label: "$$\\text{Rp}120{,}000.00$$" },
        { isCorrect: false, label: "$$\\text{Rp}365{,}000.00$$" },
        { isCorrect: false, label: "$$\\text{Rp}420{,}000.00$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$\\text{Rp}360{.}000{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp}480{.}000{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp}120{.}000{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp}365{.}000{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp}420{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
