import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Nudel A in $$2017\\text{-}2018$$",
        },
        {
          isCorrect: false,
          label: "Nudel A in $$2019\\text{-}2020$$",
        },
        {
          isCorrect: false,
          label: "Nudel B in $$2017\\text{-}2018$$",
        },
        {
          isCorrect: false,
          label: "Nudel B in $$2018\\text{-}2019$$",
        },
        {
          isCorrect: false,
          label: "Nudel C in $$2019\\text{-}2020$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Noodle A in $$2017\\text{-}2018$$",
        },
        {
          isCorrect: false,
          label: "Noodle A in $$2019\\text{-}2020$$",
        },
        {
          isCorrect: false,
          label: "Noodle B in $$2017\\text{-}2018$$",
        },
        {
          isCorrect: false,
          label: "Noodle B in $$2018\\text{-}2019$$",
        },
        {
          isCorrect: false,
          label: "Noodle C in $$2019\\text{-}2020$$",
        },
      ],
    },
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
