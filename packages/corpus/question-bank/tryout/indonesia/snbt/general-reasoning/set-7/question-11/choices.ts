import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$150\\text{ Gramm}$$",
      value: false,
    },
    {
      label: "$$175\\text{ Gramm}$$",
      value: false,
    },
    {
      label: "$$225\\text{ Gramm}$$",
      value: true,
    },
    {
      label: "$$250\\text{ Gramm}$$",
      value: false,
    },
    {
      label: "$$275\\text{ Gramm}$$",
      value: false,
    },
  ],
  en: [
    { label: "$$150\\text{ grams}$$", value: false },
    { label: "$$175\\text{ grams}$$", value: false },
    { label: "$$225\\text{ grams}$$", value: true },
    { label: "$$250\\text{ grams}$$", value: false },
    { label: "$$275\\text{ grams}$$", value: false },
  ],
  id: [
    { label: "$$150\\text{ gram}$$", value: false },
    { label: "$$175\\text{ gram}$$", value: false },
    { label: "$$225\\text{ gram}$$", value: true },
    { label: "$$250\\text{ gram}$$", value: false },
    { label: "$$275\\text{ gram}$$", value: false },
  ],
};

export default choices;
