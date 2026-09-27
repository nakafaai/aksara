import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Mie A pada tahun $$2017\\text{-}2018$$",
        },
        {
          isCorrect: false,
          label: "Mie A pada tahun $$2019\\text{-}2020$$",
        },
        {
          isCorrect: false,
          label: "Mie B pada tahun $$2017\\text{-}2018$$",
        },
        {
          isCorrect: false,
          label: "Mie B pada tahun $$2018\\text{-}2019$$",
        },
        {
          isCorrect: false,
          label: "Mie C pada tahun $$2019\\text{-}2020$$",
        },
      ],
    },
  },
};

export default item;
