import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp }950{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }1{.}050{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }1{.}150{,}00$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp }1{.}250{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }1{.}350{,}00$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\text{Rp }950.00$$" },
        { isCorrect: false, label: "$$\\text{Rp }1{,}050.00$$" },
        { isCorrect: false, label: "$$\\text{Rp }1{,}150.00$$" },
        { isCorrect: true, label: "$$\\text{Rp }1{,}250.00$$" },
        { isCorrect: false, label: "$$\\text{Rp }1{,}350.00$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\text{Rp }950{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp }1{.}050{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp }1{.}150{,}00$$" },
        { isCorrect: true, label: "$$\\text{Rp }1{.}250{,}00$$" },
        { isCorrect: false, label: "$$\\text{Rp }1{.}350{,}00$$" },
      ],
    },
  },
};

export default item;
