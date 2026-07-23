import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$1.31\\%$$", value: false },
    { label: "$$1.41\\%$$", value: false },
    { label: "$$1.51\\%$$", value: false },
    { label: "$$1.61\\%$$", value: true },
    { label: "$$1.71\\%$$", value: false },
  ],
  id: [
    { label: "$$1{,}31\\%$$", value: false },
    { label: "$$1{,}41\\%$$", value: false },
    { label: "$$1{,}51\\%$$", value: false },
    { label: "$$1{,}61\\%$$", value: true },
    { label: "$$1{,}71\\%$$", value: false },
  ],
};

export default choices;
