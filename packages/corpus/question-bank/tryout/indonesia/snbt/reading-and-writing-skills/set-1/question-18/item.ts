import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
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
