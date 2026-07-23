import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$\\text{Rp}22{,}000.00$$", value: false },
    { label: "$$\\text{Rp}33{,}000.00$$", value: false },
    { label: "$$\\text{Rp}51{,}000.00$$", value: false },
    { label: "$$\\text{Rp}67{,}000.00$$", value: true },
    { label: "$$\\text{Rp}80{,}000.00$$", value: false },
  ],
  id: [
    { label: "$$\\text{Rp}22.000{,}00$$", value: false },
    { label: "$$\\text{Rp}33.000{,}00$$", value: false },
    { label: "$$\\text{Rp}51.000{,}00$$", value: false },
    { label: "$$\\text{Rp}67.000{,}00$$", value: true },
    { label: "$$\\text{Rp}80.000{,}00$$", value: false },
  ],
};

export default choices;
