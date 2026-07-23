import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$10.01$$", value: false },
    { label: "$$10.20$$", value: false },
    { label: "$$10.36$$", value: false },
    { label: "$$10.57$$", value: true },
    { label: "$$11.02$$", value: false },
  ],
  id: [
    { label: "$$10.01$$", value: false },
    { label: "$$10.20$$", value: false },
    { label: "$$10.36$$", value: false },
    { label: "$$10.57$$", value: true },
    { label: "$$11.02$$", value: false },
  ],
};

export default choices;
