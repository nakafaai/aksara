import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$0.00033$$", value: false },
    { label: "$$0.00067$$", value: false },
    { label: "$$0.0033$$", value: false },
    { label: "$$0.0067$$", value: true },
    { label: "$$0.033$$", value: false },
  ],
  id: [
    { label: "$$0.00033$$", value: false },
    { label: "$$0.00067$$", value: false },
    { label: "$$0.0033$$", value: false },
    { label: "$$0.0067$$", value: true },
    { label: "$$0.033$$", value: false },
  ],
};

export default choices;
