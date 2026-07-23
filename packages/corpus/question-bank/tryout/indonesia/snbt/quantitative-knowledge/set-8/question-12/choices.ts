import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$6.25$$", value: false },
    { label: "$$6.50$$", value: false },
    { label: "$$7.50$$", value: false },
    { label: "$$7.75$$", value: false },
    { label: "$$8.25$$", value: true },
  ],
  id: [
    { label: "$$6{,}25$$", value: false },
    { label: "$$6{,}50$$", value: false },
    { label: "$$7{,}50$$", value: false },
    { label: "$$7{,}75$$", value: false },
    { label: "$$8{,}25$$", value: true },
  ],
};

export default choices;
