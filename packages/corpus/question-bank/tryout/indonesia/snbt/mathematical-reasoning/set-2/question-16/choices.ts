import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$\\text{Rp}60{,}000.00$$", value: false },
    { label: "$$\\text{Rp}65{,}000.00$$", value: false },
    { label: "$$\\text{Rp}67{,}000.00$$", value: false },
    { label: "$$\\text{Rp}70{,}000.00$$", value: true },
    { label: "$$\\text{Rp}75{,}000.00$$", value: false },
  ],
  id: [
    { label: "$$\\text{Rp}60.000{,}00$$", value: false },
    { label: "$$\\text{Rp}65.000{,}00$$", value: false },
    { label: "$$\\text{Rp}67.000{,}00$$", value: false },
    { label: "$$\\text{Rp}70.000{,}00$$", value: true },
    { label: "$$\\text{Rp}75.000{,}00$$", value: false },
  ],
};

export default choices;
