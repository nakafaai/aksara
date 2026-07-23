import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$\\text{Rp }27{,}500.00$$", value: false },
    { label: "$$\\text{Rp }32{,}500.00$$", value: false },
    { label: "$$\\text{Rp }35{,}000.00$$", value: false },
    { label: "$$\\text{Rp }37{,}500.00$$", value: true },
    { label: "$$\\text{Rp }42{,}500.00$$", value: false },
  ],
  id: [
    { label: "$$\\text{Rp }27.500{,}00$$", value: false },
    { label: "$$\\text{Rp }32.500{,}00$$", value: false },
    { label: "$$\\text{Rp }35.000{,}00$$", value: false },
    { label: "$$\\text{Rp }37.500{,}00$$", value: true },
    { label: "$$\\text{Rp }42.500{,}00$$", value: false },
  ],
};

export default choices;
