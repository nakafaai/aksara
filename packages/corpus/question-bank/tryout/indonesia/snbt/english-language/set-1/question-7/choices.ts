import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$1$$", value: false },
    { label: "$$2$$ and $$3$$", value: true },
    { label: "$$2$$ and $$4$$", value: false },
    { label: "$$3$$ and $$4$$", value: false },
    { label: "$$4$$", value: false },
  ],
  id: [
    { label: "$$1$$", value: false },
    { label: "$$2$$ and $$3$$", value: true },
    { label: "$$2$$ and $$4$$", value: false },
    { label: "$$3$$ and $$4$$", value: false },
    { label: "$$4$$", value: false },
  ],
};

export default choices;
