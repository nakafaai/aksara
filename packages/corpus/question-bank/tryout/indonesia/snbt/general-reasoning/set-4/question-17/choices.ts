import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "$$40\\text{ km}$$", value: false },
    { label: "$$30\\text{ km}$$", value: false },
    { label: "$$20\\text{ km}$$", value: false },
    { label: "$$10\\text{ km}$$", value: true },
    { label: "$$5\\text{ km}$$", value: false },
  ],
  en: [
    { label: "$$40\\text{ km}$$", value: false },
    { label: "$$30\\text{ km}$$", value: false },
    { label: "$$20\\text{ km}$$", value: false },
    { label: "$$10\\text{ km}$$", value: true },
    { label: "$$5\\text{ km}$$", value: false },
  ],
  id: [
    { label: "$$40\\text{ km}$$", value: false },
    { label: "$$30\\text{ km}$$", value: false },
    { label: "$$20\\text{ km}$$", value: false },
    { label: "$$10\\text{ km}$$", value: true },
    { label: "$$5\\text{ km}$$", value: false },
  ],
};

export default choices;
