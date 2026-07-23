import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$\\text{Rp}2{,}400{,}000.00$$", value: false },
    { label: "$$\\text{Rp}3{,}000{,}000.00$$", value: false },
    { label: "$$\\text{Rp}3{,}600{,}000.00$$", value: false },
    { label: "$$\\text{Rp}6{,}000{,}000.00$$", value: false },
    { label: "$$\\text{Rp}9{,}000{,}000.00$$", value: true },
  ],
  id: [
    { label: "$$\\text{Rp}2.400.000{,}00$$", value: false },
    { label: "$$\\text{Rp}3.000.000{,}00$$", value: false },
    { label: "$$\\text{Rp}3.600.000{,}00$$", value: false },
    { label: "$$\\text{Rp}6.000.000{,}00$$", value: false },
    { label: "$$\\text{Rp}9.000.000{,}00$$", value: true },
  ],
};

export default choices;
