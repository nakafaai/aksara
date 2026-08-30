import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp }394{.}000{,}00$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp }374{.}300{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }375{.}500{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }390{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }425{.}000{,}00$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\text{Rp394{,}000.00}$$" },
        { isCorrect: true, label: "$$\\text{Rp374{,}300.00}$$" },
        { isCorrect: false, label: "$$\\text{Rp375{,}500.00}$$" },
        { isCorrect: false, label: "$$\\text{Rp390{,}000.00}$$" },
        { isCorrect: false, label: "$$\\text{Rp425{,}000.00}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\text{Rp394{.}000{,}00}$$" },
        { isCorrect: true, label: "$$\\text{Rp374{.}300{,}00}$$" },
        { isCorrect: false, label: "$$\\text{Rp375{.}500{,}00}$$" },
        { isCorrect: false, label: "$$\\text{Rp390{.}000{,}00}$$" },
        { isCorrect: false, label: "$$\\text{Rp425{.}000{,}00}$$" },
      ],
    },
  },
};

export default item;
