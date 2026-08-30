import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp}125{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}135{.}650{,}00$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp}155{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}160{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}165{.}000{,}00$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\text{Rp}125{,}000.00$$" },
        { isCorrect: false, label: "$$\\text{Rp}135{,}650.00$$" },
        { isCorrect: true, label: "$$\\text{Rp}155{,}000.00$$" },
        { isCorrect: false, label: "$$\\text{Rp}160{,}000.00$$" },
        { isCorrect: false, label: "$$\\text{Rp}165{,}000.00$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\text{Rp}125{.}000{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp}135{.}650{,}00$$" },
        { isCorrect: true, label: "$$\\text{Rp}155{.}000{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp}160{.}000{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp}165{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
