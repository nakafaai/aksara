import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$1.8$$", value: false },
    { label: "$$2.0$$", value: false },
    { label: "$$2.4$$", value: true },
    { label: "$$3.2$$", value: false },
    { label: "$$3.6$$", value: false },
  ],
  id: [
    { label: "$$1{,}8$$", value: false },
    { label: "$$2{,}0$$", value: false },
    { label: "$$2{,}4$$", value: true },
    { label: "$$3{,}2$$", value: false },
    { label: "$$3{,}6$$", value: false },
  ],
};

export default choices;
