import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$5 \\text{ and } -3$$", value: false },
    { label: "$$-5 \\text{ and } 3$$", value: false },
    { label: "$$\\frac{5}{3} \\text{ and } -1$$", value: true },
    { label: "$$-\\frac{5}{3} \\text{ and } 1$$", value: false },
    { label: "$$5 \\text{ and } -1$$", value: false },
  ],
  id: [
    { label: "$$5 \\text{ dan } -3$$", value: false },
    { label: "$$-5 \\text{ dan } 3$$", value: false },
    { label: "$$\\frac{5}{3} \\text{ dan } -1$$", value: true },
    { label: "$$-\\frac{5}{3} \\text{ dan } 1$$", value: false },
    { label: "$$5 \\text{ dan } -1$$", value: false },
  ],
};

export default choices;
