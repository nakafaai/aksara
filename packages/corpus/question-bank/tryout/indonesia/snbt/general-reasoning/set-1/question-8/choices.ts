import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$\\text{Rp}40{,}000{,}000{,}000.00$$", value: false },
    { label: "$$\\text{Rp}50{,}000{,}000{,}000.00$$", value: false },
    { label: "$$\\text{Rp}60{,}000{,}000{,}000.00$$", value: false },
    { label: "$$\\text{Rp}70{,}000{,}000{,}000.00$$", value: true },
    { label: "$$\\text{Rp}80{,}000{,}000{,}000.00$$", value: false },
  ],
  id: [
    { label: "$$\\text{Rp}40.000.000.000{,}00$$", value: false },
    { label: "$$\\text{Rp}50.000.000.000{,}00$$", value: false },
    { label: "$$\\text{Rp}60.000.000.000{,}00$$", value: false },
    { label: "$$\\text{Rp}70.000.000.000{,}00$$", value: true },
    { label: "$$\\text{Rp}80.000.000.000{,}00$$", value: false },
  ],
};

export default choices;
