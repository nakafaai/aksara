import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$3.2\\text{ km}$$", value: false },
    { label: "$$6.4\\text{ km}$$", value: false },
    { label: "$$7.0\\text{ km}$$", value: false },
    { label: "$$7.6\\text{ km}$$", value: true },
    { label: "$$8.4\\text{ km}$$", value: false },
  ],
  id: [
    { label: "$$3{,}2\\text{ km}$$", value: false },
    { label: "$$6{,}4\\text{ km}$$", value: false },
    { label: "$$7{,}0\\text{ km}$$", value: false },
    { label: "$$7{,}6\\text{ km}$$", value: true },
    { label: "$$8{,}4\\text{ km}$$", value: false },
  ],
};

export default choices;
