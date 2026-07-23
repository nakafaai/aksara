import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$m > 6$$", value: false },
    { label: "$$-2 < m < 6$$", value: false },
    { label: "$$-6 < m < 2$$", value: false },
    { label: "$$m \\leq -2 \\lor m \\geq 6$$", value: false },
    { label: "$$m < -2 \\lor m > 6$$", value: true },
  ],
  id: [
    { label: "$$m > 6$$", value: false },
    { label: "$$-2 < m < 6$$", value: false },
    { label: "$$-6 < m < 2$$", value: false },
    { label: "$$m \\leq -2 \\lor m \\geq 6$$", value: false },
    { label: "$$m < -2 \\lor m > 6$$", value: true },
  ],
};

export default choices;
