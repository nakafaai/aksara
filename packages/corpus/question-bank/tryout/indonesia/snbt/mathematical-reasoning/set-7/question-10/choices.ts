import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$\\frac{1}{20}$$", value: false },
    { label: "$$\\frac{1}{10}$$", value: false },
    { label: "$$\\frac{1}{8}$$", value: false },
    { label: "$$\\frac{1}{4}$$", value: false },
    { label: "$$\\frac{3}{4}$$", value: true },
  ],
  id: [
    { label: "$$\\frac{1}{20}$$", value: false },
    { label: "$$\\frac{1}{10}$$", value: false },
    { label: "$$\\frac{1}{8}$$", value: false },
    { label: "$$\\frac{1}{4}$$", value: false },
    { label: "$$\\frac{3}{4}$$", value: true },
  ],
};

export default choices;
