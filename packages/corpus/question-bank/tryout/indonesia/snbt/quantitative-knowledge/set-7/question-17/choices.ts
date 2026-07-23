import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$1, 2, 3$$", value: false },
    { label: "$$1, 3$$", value: false },
    { label: "$$2, 4$$", value: false },
    { label: "$$4$$ only", value: false },
    { label: "all", value: true },
  ],
  id: [
    { label: "$$1, 2, 3$$", value: false },
    { label: "$$1, 3$$", value: false },
    { label: "$$2, 4$$", value: false },
    { label: "$$4$$ saja", value: false },
    { label: "semua", value: true },
  ],
};

export default choices;
