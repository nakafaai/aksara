import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp }10{.}500{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }10{.}000{,}00$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp }9{.}500{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }9{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }8{.}500{,}00$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp10{,}500.00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp10{,}000.00}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp9{,}500.00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp9{,}000.00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp8{,}500.00}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp10{.}500{,}00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp10{.}000{,}00}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp9{.}500{,}00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp9{.}000{,}00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp8{.}500{,}00}$$",
        },
      ],
    },
  },
};

export default item;
