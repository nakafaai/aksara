import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$1 : 3$$", value: false },
    { label: "$$1 : 4$$", value: false },
    { label: "$$1 : 8$$", value: false },
    { label: "$$1 : 9$$", value: true },
    { label: "$$2 : 3$$", value: false },
  ],
  id: [
    { label: "$$1 : 3$$", value: false },
    { label: "$$1 : 4$$", value: false },
    { label: "$$1 : 8$$", value: false },
    { label: "$$1 : 9$$", value: true },
    { label: "$$2 : 3$$", value: false },
  ],
};

export default choices;
