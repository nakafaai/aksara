import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$1$$, $$2$$, and $$3$$", value: true },
    { label: "$$1$$ and $$3$$", value: false },
    { label: "$$2$$ and $$4$$", value: false },
    { label: "$$4$$ only", value: false },
    { label: "$$1$$, $$2$$, $$3$$, and $$4$$", value: false },
  ],
  id: [
    { label: "$$1$$, $$2$$, dan $$3$$", value: true },
    { label: "$$1$$ dan $$3$$", value: false },
    { label: "$$2$$ dan $$4$$", value: false },
    { label: "$$4$$ saja", value: false },
    { label: "$$1$$, $$2$$, $$3$$, dan $$4$$", value: false },
  ],
};

export default choices;
