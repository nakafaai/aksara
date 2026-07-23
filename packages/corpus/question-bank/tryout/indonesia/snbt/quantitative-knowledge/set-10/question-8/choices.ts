import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$1$$ and $$3$$", value: true },
    { label: "$$2$$ and $$4$$", value: false },
    { label: "$$1$$ and $$4$$", value: false },
    { label: "$$3$$ and $$4$$", value: false },
    { label: "$$1$$", value: false },
  ],
  id: [
    { label: "$$1$$ dan $$3$$", value: true },
    { label: "$$2$$ dan $$4$$", value: false },
    { label: "$$1$$ dan $$4$$", value: false },
    { label: "$$3$$ dan $$4$$", value: false },
    { label: "$$1$$", value: false },
  ],
};

export default choices;
