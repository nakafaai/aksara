import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$4$$ only", value: false },
    { label: "$$1$$ and $$4$$", value: false },
    { label: "$$3$$ and $$4$$", value: true },
    { label: "$$2$$, $$3$$, and $$4$$", value: false },
    { label: "$$1$$, $$2$$, $$3$$, and $$4$$", value: false },
  ],
  id: [
    { label: "$$4$$ saja", value: false },
    { label: "$$1$$ dan $$4$$", value: false },
    { label: "$$3$$ dan $$4$$", value: true },
    { label: "$$2$$, $$3$$, dan $$4$$", value: false },
    { label: "$$1$$, $$2$$, $$3$$, dan $$4$$", value: false },
  ],
};

export default choices;
