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
          isCorrect: true,
          label: "$$48{,}35\\,\\%$$.",
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
          isCorrect: true,
          label: "$$48.35\\%$$.",
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
          isCorrect: true,
          label: "$$48{,}35\\%$$.",
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
      ],
    },
  },
};

export default item;
