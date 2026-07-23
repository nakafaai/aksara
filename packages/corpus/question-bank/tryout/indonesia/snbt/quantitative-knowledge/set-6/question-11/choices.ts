import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$0.9$$", value: false },
    { label: "$$1.9$$", value: false },
    { label: "$$2.3$$", value: false },
    { label: "$$2.6$$", value: false },
    { label: "$$3.6$$", value: true },
  ],
  id: [
    { label: "$$0{,}9$$", value: false },
    { label: "$$1{,}9$$", value: false },
    { label: "$$2{,}3$$", value: false },
    { label: "$$2{,}6$$", value: false },
    { label: "$$3{,}6$$", value: true },
  ],
};

export default choices;
