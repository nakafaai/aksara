import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$0.085$$", value: false },
    { label: "$$0.095$$", value: true },
    { label: "$$0.85$$", value: false },
    { label: "$$0.95$$", value: false },
    { label: "$$0.075$$", value: false },
  ],
  id: [
    { label: "$$0{,}085$$", value: false },
    { label: "$$0{,}095$$", value: true },
    { label: "$$0{,}85$$", value: false },
    { label: "$$0{,}95$$", value: false },
    { label: "$$0{,}075$$", value: false },
  ],
};

export default choices;
