import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$\\text{Rp10{,}500.00}$$", value: false },
    { label: "$$\\text{Rp10{,}000.00}$$", value: false },
    { label: "$$\\text{Rp9{,}500.00}$$", value: true },
    { label: "$$\\text{Rp9{,}000.00}$$", value: false },
    { label: "$$\\text{Rp8{,}500.00}$$", value: false },
  ],
  id: [
    { label: "$$\\text{Rp10.500{,}00}$$", value: false },
    { label: "$$\\text{Rp10.000{,}00}$$", value: false },
    { label: "$$\\text{Rp9.500{,}00}$$", value: true },
    { label: "$$\\text{Rp9.000{,}00}$$", value: false },
    { label: "$$\\text{Rp8.500{,}00}$$", value: false },
  ],
};

export default choices;
