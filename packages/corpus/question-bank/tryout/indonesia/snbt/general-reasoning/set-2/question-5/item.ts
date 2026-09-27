import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Baju pada tahun $$2011\\text{-}2012$$",
        },
        {
          isCorrect: false,
          label: "Baju pada tahun $$2012\\text{-}2013$$",
        },
        {
          isCorrect: true,
          label: "Jas pada tahun $$2014\\text{-}2015$$",
        },
        {
          isCorrect: false,
          label: "Jas pada tahun $$2012\\text{-}2013$$",
        },
        {
          isCorrect: false,
          label: "Celana pada tahun $$2013\\text{-}2014$$",
        },
      ],
    },
  },
};

export default item;
