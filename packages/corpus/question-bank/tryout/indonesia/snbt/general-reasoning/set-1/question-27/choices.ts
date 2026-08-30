import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "$$60\text{ km/h}$$", value: false },
    { label: "$$64\text{ km/h}$$", value: false },
    { label: "$$66\frac{2}{3}\text{ km/h}$$", value: true },
    { label: "$$70\text{ km/h}$$", value: false },
    { label: "$$72\text{ km/h}$$", value: false },
  ],
  en: [
    { label: "$$60\text{ km/h}$$", value: false },
    { label: "$$64\text{ km/h}$$", value: false },
    { label: "$$66\frac{2}{3}\text{ km/h}$$", value: true },
    { label: "$$70\text{ km/h}$$", value: false },
    { label: "$$72\text{ km/h}$$", value: false },
  ],
  id: [
    { label: "$$60\text{ km/jam}$$", value: false },
    { label: "$$64\text{ km/jam}$$", value: false },
    { label: "$$66\frac{2}{3}\text{ km/jam}$$", value: true },
    { label: "$$70\text{ km/jam}$$", value: false },
    { label: "$$72\text{ km/jam}$$", value: false },
  ],
};

export default choices;
