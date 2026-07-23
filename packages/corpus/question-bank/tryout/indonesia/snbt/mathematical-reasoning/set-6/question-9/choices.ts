import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$y = -x^2 + 150x + 60{,}000$$", value: false },
    { label: "$$y = x^2 + 150x + 60{,}000$$", value: true },
    { label: "$$y = -x^2 - 150x + 60{,}000$$", value: false },
    { label: "$$y = x^2 - 150x + 60{,}000$$", value: false },
    { label: "$$y = x^2 + 200x + 60{,}000$$", value: false },
  ],
  id: [
    { label: "$$y = -x^2 + 150x + 60.000$$", value: false },
    { label: "$$y = x^2 + 150x + 60.000$$", value: true },
    { label: "$$y = -x^2 - 150x + 60.000$$", value: false },
    { label: "$$y = x^2 - 150x + 60.000$$", value: false },
    { label: "$$y = x^2 + 200x + 60.000$$", value: false },
  ],
};

export default choices;
