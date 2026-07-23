import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$\\text{Rp}16{,}000.00$$", value: false },
    { label: "$$\\text{Rp}18{,}000.00$$", value: false },
    { label: "$$\\text{Rp}20{,}000.00$$", value: true },
    { label: "$$\\text{Rp}25{,}000.00$$", value: false },
    { label: "$$\\text{Rp}32{,}000.00$$", value: false },
  ],
  id: [
    { label: "$$\\text{Rp}16.000{,}00$$", value: false },
    { label: "$$\\text{Rp}18.000{,}00$$", value: false },
    { label: "$$\\text{Rp}20.000{,}00$$", value: true },
    { label: "$$\\text{Rp}25.000{,}00$$", value: false },
    { label: "$$\\text{Rp}32.000{,}00$$", value: false },
  ],
};

export default choices;
