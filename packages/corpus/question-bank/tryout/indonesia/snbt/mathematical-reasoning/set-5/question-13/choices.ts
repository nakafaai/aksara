import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$\\text{Rp }394{.}000{,}00$$",
      value: false,
    },
    {
      label: "$$\\text{Rp }374{.}300{,}00$$",
      value: true,
    },
    {
      label: "$$\\text{Rp }375{.}500{,}00$$",
      value: false,
    },
    {
      label: "$$\\text{Rp }390{.}000{,}00$$",
      value: false,
    },
    {
      label: "$$\\text{Rp }425{.}000{,}00$$",
      value: false,
    },
  ],
  en: [
    { label: "$$\\text{Rp394{,}000.00}$$", value: false },
    { label: "$$\\text{Rp374{,}300.00}$$", value: true },
    { label: "$$\\text{Rp375{,}500.00}$$", value: false },
    { label: "$$\\text{Rp390{,}000.00}$$", value: false },
    { label: "$$\\text{Rp425{,}000.00}$$", value: false },
  ],
  id: [
    { label: "$$\\text{Rp394{.}000{,}00}$$", value: false },
    { label: "$$\\text{Rp374{.}300{,}00}$$", value: true },
    { label: "$$\\text{Rp375{.}500{,}00}$$", value: false },
    { label: "$$\\text{Rp390{.}000{,}00}$$", value: false },
    { label: "$$\\text{Rp425{.}000{,}00}$$", value: false },
  ],
};

export default choices;
