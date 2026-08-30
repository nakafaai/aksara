import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp}2{.}400{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}3{.}000{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}3{.}600{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}6{.}000{.}000{,}00$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp}9{.}000{.}000{,}00$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\text{Rp}2{,}400{,}000.00$$" },
        { isCorrect: false, label: "$$\\text{Rp}3{,}000{,}000.00$$" },
        { isCorrect: false, label: "$$\\text{Rp}3{,}600{,}000.00$$" },
        { isCorrect: false, label: "$$\\text{Rp}6{,}000{,}000.00$$" },
        { isCorrect: true, label: "$$\\text{Rp}9{,}000{,}000.00$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\text{Rp}2{.}400{.}000{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp}3{.}000{.}000{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp}3{.}600{.}000{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp}6{.}000{.}000{,}00$$" },
        { isCorrect: true, label: "$$\\text{Rp}9{.}000{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
