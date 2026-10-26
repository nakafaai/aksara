import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Baju pada tahun $$2011\\text{-}2012$$",
        },
        {
          correct: false,
          label: "Baju pada tahun $$2012\\text{-}2013$$",
        },
        {
          correct: true,
          label: "Jas pada tahun $$2014\\text{-}2015$$",
        },
        {
          correct: false,
          label: "Jas pada tahun $$2012\\text{-}2013$$",
        },
        {
          correct: false,
          label: "Celana pada tahun $$2013\\text{-}2014$$",
        },
      ],
    },
  },
};

export default item;
