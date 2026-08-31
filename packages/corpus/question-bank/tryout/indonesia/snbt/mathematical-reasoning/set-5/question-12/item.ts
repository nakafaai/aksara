import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp }12{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }12{.}100{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }12{.}200{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }12{.}500{,}00$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp }12{.}320{,}00$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp12{,}000.00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp12{,}100.00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp12{,}200.00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp12{,}500.00}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp12{,}320.00}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp12{.}000{,}00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp12{.}100{,}00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp12{.}200{,}00}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp12{.}500{,}00}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp12{.}320{,}00}$$",
        },
      ],
    },
  },
};

export default item;
