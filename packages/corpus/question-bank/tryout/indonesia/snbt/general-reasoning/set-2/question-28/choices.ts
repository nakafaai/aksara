import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "$$7{,}5\text{ Stunden}$$", value: false },
    { label: "$$9\text{ Stunden}$$", value: false },
    { label: "$$10{,}5\text{ Stunden}$$", value: true },
    { label: "$$12\text{ Stunden}$$", value: false },
    { label: "$$13{,}5\text{ Stunden}$$", value: false },
  ],
  en: [
    { label: "$$7.5\text{ hours}$$", value: false },
    { label: "$$9\text{ hours}$$", value: false },
    { label: "$$10.5\text{ hours}$$", value: true },
    { label: "$$12\text{ hours}$$", value: false },
    { label: "$$13.5\text{ hours}$$", value: false },
  ],
  id: [
    { label: "$$7{,}5\text{ jam}$$", value: false },
    { label: "$$9\text{ jam}$$", value: false },
    { label: "$$10{,}5\text{ jam}$$", value: true },
    { label: "$$12\text{ jam}$$", value: false },
    { label: "$$13{,}5\text{ jam}$$", value: false },
  ],
};

export default choices;
