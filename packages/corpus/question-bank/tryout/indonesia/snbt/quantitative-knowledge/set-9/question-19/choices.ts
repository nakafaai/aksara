import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$64$$", value: false },
    { label: "$$64.88$$", value: true },
    { label: "$$65.09$$", value: false },
    { label: "$$65.20$$", value: false },
    { label: "$$65.34$$", value: false },
  ],
  id: [
    { label: "$$64$$", value: false },
    { label: "$$64{,}88$$", value: true },
    { label: "$$65{,}09$$", value: false },
    { label: "$$65{,}20$$", value: false },
    { label: "$$65{,}34$$", value: false },
  ],
};

export default choices;
