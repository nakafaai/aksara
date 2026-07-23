import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Noodle A in $$2019\\text{-}2020$$", value: false },
    { label: "Noodle B in $$2017\\text{-}2018$$", value: false },
    { label: "Noodle B in $$2018\\text{-}2019$$", value: false },
    { label: "Noodle C in $$2019\\text{-}2020$$", value: false },
    { label: "Noodle A in $$2017\\text{-}2018$$", value: true },
  ],
  id: [
    { label: "Mie A pada tahun $$2019\\text{-}2020$$", value: false },
    { label: "Mie B pada tahun $$2017\\text{-}2018$$", value: false },
    { label: "Mie B pada tahun $$2018\\text{-}2019$$", value: false },
    { label: "Mie C pada tahun $$2019\\text{-}2020$$", value: false },
    { label: "Mie A pada tahun $$2017\\text{-}2018$$", value: true },
  ],
};

export default choices;
