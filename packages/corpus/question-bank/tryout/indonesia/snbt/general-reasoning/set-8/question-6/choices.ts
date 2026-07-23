import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$1$$ and $$2$$", value: false },
    { label: "$$2$$ and $$4$$", value: false },
    { label: "$$2$$, $$3$$, and $$4$$", value: false },
    { label: "$$1$$, $$3$$, and $$4$$", value: false },
    { label: "$$1$$, $$2$$, $$3$$, and $$4$$", value: true },
  ],
  id: [
    { label: "$$1$$ dan $$2$$", value: false },
    { label: "$$2$$ dan $$4$$", value: false },
    { label: "$$2$$, $$3$$, dan $$4$$", value: false },
    { label: "$$1$$, $$3$$, dan $$4$$", value: false },
    { label: "$$1$$, $$2$$, $$3$$, dan $$4$$", value: true },
  ],
};

export default choices;
