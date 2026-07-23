import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$\\frac{1}{3}$$", value: false },
    { label: "$$\\frac{2}{3}$$", value: false },
    { label: "$$0.5$$", value: true },
    { label: "$$0.333$$", value: false },
    { label: "$$\\frac{1}{4}$$", value: false },
  ],
  id: [
    { label: "$$\\frac{1}{3}$$", value: false },
    { label: "$$\\frac{2}{3}$$", value: false },
    { label: "$$0{,}5$$", value: true },
    { label: "$$0{,}333$$", value: false },
    { label: "$$\\frac{1}{4}$$", value: false },
  ],
};

export default choices;
