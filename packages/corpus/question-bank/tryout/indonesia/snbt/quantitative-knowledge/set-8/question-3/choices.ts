import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$A = B$$", value: false },
    { label: "$$A = 2B$$", value: false },
    { label: "$$A > B$$", value: true },
    { label: "$$A < B$$", value: false },
    { label: "$$A = \\frac{1}{2}B$$", value: false },
  ],
  id: [
    { label: "$$A = B$$", value: false },
    { label: "$$A = 2B$$", value: false },
    { label: "$$A > B$$", value: true },
    { label: "$$A < B$$", value: false },
    { label: "$$A = \\frac{1}{2}B$$", value: false },
  ],
};

export default choices;
