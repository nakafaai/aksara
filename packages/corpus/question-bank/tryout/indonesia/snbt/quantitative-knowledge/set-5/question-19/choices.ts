import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$4$$", value: false },
    { label: "$$3$$", value: false },
    { label: "$$0$$", value: false },
    { label: "$$-3$$", value: false },
    { label: "$$-4$$", value: true },
  ],
  id: [
    { label: "$$4$$", value: false },
    { label: "$$3$$", value: false },
    { label: "$$0$$", value: false },
    { label: "$$-3$$", value: false },
    { label: "$$-4$$", value: true },
  ],
};

export default choices;
