import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Hemden in $$2011\\text{-}2012$$",
      value: false,
    },
    {
      label: "Anzüge in $$2014\\text{-}2015$$",
      value: true,
    },
    {
      label: "Hemden in $$2012\\text{-}2013$$",
      value: false,
    },
    {
      label: "Anzüge in $$2012\\text{-}2013$$",
      value: false,
    },
    {
      label: "Hosen in $$2013\\text{-}2014$$",
      value: false,
    },
  ],
  en: [
    { label: "Shirts in $$2011\\text{-}2012$$", value: false },
    { label: "Suits in $$2014\\text{-}2015$$", value: true },
    { label: "Shirts in $$2012\\text{-}2013$$", value: false },
    { label: "Suits in $$2012\\text{-}2013$$", value: false },
    { label: "Pants in $$2013\\text{-}2014$$", value: false },
  ],
  id: [
    { label: "Baju pada tahun $$2011\\text{-}2012$$", value: false },
    { label: "Jas pada tahun $$2014\\text{-}2015$$", value: true },
    { label: "Baju pada tahun $$2012\\text{-}2013$$", value: false },
    { label: "Jas pada tahun $$2012\\text{-}2013$$", value: false },
    { label: "Celana pada tahun $$2013\\text{-}2014$$", value: false },
  ],
};

export default choices;
