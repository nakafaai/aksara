import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Mie A pada tahun $$2017\\text{-}2018$$",
        },
        {
          correct: false,
          label: "Mie A pada tahun $$2019\\text{-}2020$$",
        },
        {
          correct: false,
          label: "Mie B pada tahun $$2017\\text{-}2018$$",
        },
        {
          correct: false,
          label: "Mie B pada tahun $$2018\\text{-}2019$$",
        },
        {
          correct: false,
          label: "Mie C pada tahun $$2019\\text{-}2020$$",
        },
      ],
    },
  },
};

export default item;
