import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "$$2:3$$", value: false },
    { label: "$$3:5$$", value: false },
    { label: "$$5:7$$", value: true },
    { label: "$$7:10$$", value: false },
    { label: "$$1:1$$", value: false },
  ],
  en: [
    { label: "$$2:3$$", value: false },
    { label: "$$3:5$$", value: false },
    { label: "$$5:7$$", value: true },
    { label: "$$7:10$$", value: false },
    { label: "$$1:1$$", value: false },
  ],
  id: [
    { label: "$$2:3$$", value: false },
    { label: "$$3:5$$", value: false },
    { label: "$$5:7$$", value: true },
    { label: "$$7:10$$", value: false },
    { label: "$$1:1$$", value: false },
  ],
};

export default choices;
