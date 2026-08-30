import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Hemden in $$2011\\text{-}2012$$",
        },
        {
          isCorrect: true,
          label: "Anzüge in $$2014\\text{-}2015$$",
        },
        {
          isCorrect: false,
          label: "Hemden in $$2012\\text{-}2013$$",
        },
        {
          isCorrect: false,
          label: "Anzüge in $$2012\\text{-}2013$$",
        },
        {
          isCorrect: false,
          label: "Hosen in $$2013\\text{-}2014$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Shirts in $$2011\\text{-}2012$$" },
        { isCorrect: true, label: "Suits in $$2014\\text{-}2015$$" },
        { isCorrect: false, label: "Shirts in $$2012\\text{-}2013$$" },
        { isCorrect: false, label: "Suits in $$2012\\text{-}2013$$" },
        { isCorrect: false, label: "Pants in $$2013\\text{-}2014$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Baju pada tahun $$2011\\text{-}2012$$" },
        { isCorrect: true, label: "Jas pada tahun $$2014\\text{-}2015$$" },
        { isCorrect: false, label: "Baju pada tahun $$2012\\text{-}2013$$" },
        { isCorrect: false, label: "Jas pada tahun $$2012\\text{-}2013$$" },
        { isCorrect: false, label: "Celana pada tahun $$2013\\text{-}2014$$" },
      ],
    },
  },
};

export default item;
