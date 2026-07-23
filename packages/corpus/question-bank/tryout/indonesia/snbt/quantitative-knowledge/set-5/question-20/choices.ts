import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$\\frac{2x + 12}{x^2 - 4}$$", value: false },
    { label: "$$\\frac{x - 12}{x^2 - 4}$$", value: false },
    { label: "$$\\frac{-x + 12}{x^2 - 4}$$", value: false },
    { label: "$$\\frac{-2x}{x^2 - 4}$$", value: false },
    { label: "$$\\frac{x - 4}{x^2 - 4}$$", value: true },
  ],
  id: [
    { label: "$$\\frac{2x + 12}{x^2 - 4}$$", value: false },
    { label: "$$\\frac{x - 12}{x^2 - 4}$$", value: false },
    { label: "$$\\frac{-x + 12}{x^2 - 4}$$", value: false },
    { label: "$$\\frac{-2x}{x^2 - 4}$$", value: false },
    { label: "$$\\frac{x - 4}{x^2 - 4}$$", value: true },
  ],
};

export default choices;
