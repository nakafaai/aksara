import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$72\\text{ hours}$$", value: false },
    { label: "$$132\\text{ hours}$$", value: false },
    { label: "$$144\\text{ hours}$$", value: true },
    { label: "$$240\\text{ hours}$$", value: false },
    { label: "$$360\\text{ hours}$$", value: false },
  ],
  id: [
    { label: "$$72\\text{ jam}$$", value: false },
    { label: "$$132\\text{ jam}$$", value: false },
    { label: "$$144\\text{ jam}$$", value: true },
    { label: "$$240\\text{ jam}$$", value: false },
    { label: "$$360\\text{ jam}$$", value: false },
  ],
};

export default choices;
