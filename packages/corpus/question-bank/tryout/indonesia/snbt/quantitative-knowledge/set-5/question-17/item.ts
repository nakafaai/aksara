import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$C + \\text{Rp}4{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$2C + \\text{Rp}4{.}000{,}00$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{4}{3}C + \\text{Rp}4{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{2}C + \\text{Rp}1{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$2C + \\text{Rp}2{.}000{,}00$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$C + \\text{Rp}4{,}000.00$$" },
        { isCorrect: false, label: "$$2C + \\text{Rp}4{,}000.00$$" },
        { isCorrect: true, label: "$$\\frac{4}{3}C + \\text{Rp}4{,}000.00$$" },
        { isCorrect: false, label: "$$\\frac{3}{2}C + \\text{Rp}1{,}000.00$$" },
        { isCorrect: false, label: "$$2C + \\text{Rp}2{,}000.00$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$C + \\text{Rp}4{.}000{,}00$$" },
        { isCorrect: false, label: "$$2C + \\text{Rp}4{.}000{,}00$$" },
        {
          isCorrect: true,
          label: "$$\\frac{4}{3}C + \\text{Rp}4{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{2}C + \\text{Rp}1{.}000{,}00$$",
        },
        { isCorrect: false, label: "$$2C + \\text{Rp}2{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
