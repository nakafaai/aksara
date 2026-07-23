import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$y = 2x - 4$$", value: false },
    { label: "$$y = -2x - 2$$", value: false },
    { label: "$$y = -2x + 4$$", value: false },
    { label: "$$y = 2x + 12$$", value: true },
    { label: "$$y = -2x + 12$$", value: false },
  ],
  id: [
    { label: "$$y = 2x - 4$$", value: false },
    { label: "$$y = -2x - 2$$", value: false },
    { label: "$$y = -2x + 4$$", value: false },
    { label: "$$y = 2x + 12$$", value: true },
    { label: "$$y = -2x + 12$$", value: false },
  ],
};

export default choices;
