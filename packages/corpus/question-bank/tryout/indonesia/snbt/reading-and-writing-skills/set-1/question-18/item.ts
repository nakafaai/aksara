import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "achtundvierzig-Komma-drei-fünf-Prozent.",
        },
        {
          isCorrect: false,
          label: "$$48{,}35\\text{-}\\%$$.",
        },
        {
          isCorrect: false,
          label: "$$48{,}35$$.",
        },
        {
          isCorrect: false,
          label: "$$4835\\,\\%$$.",
        },
        {
          isCorrect: true,
          label: "$$48{,}35\\,\\%$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "forty-eight-point-three-five-percent.",
        },
        {
          isCorrect: false,
          label: "$$48.35\\text{-}\\%$$.",
        },
        {
          isCorrect: false,
          label: "$$48.35$$.",
        },
        {
          isCorrect: false,
          label: "$$4835\\%$$.",
        },
        {
          isCorrect: true,
          label: "$$48.35\\%$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "empat-puluh-delapan-koma-tiga-lima-persen.",
        },
        {
          isCorrect: false,
          label: "$$48{,}35\\text{-}\\%$$.",
        },
        {
          isCorrect: false,
          label: "$$48{,}35$$.",
        },
        {
          isCorrect: false,
          label: "$$4835\\%$$.",
        },
        {
          isCorrect: true,
          label: "$$48{,}35\\%$$.",
        },
      ],
    },
  },
};

export default item;
