import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$\\text{it}$$", value: false },
    { label: "$$\\text{pit}$$", value: false },
    { label: "$$\\text{sit}$$", value: false },
    { label: "$$\\text{nit}$$", value: true },
    { label: "none of the above", value: false },
  ],
  id: [
    { label: "$$\\text{it}$$", value: false },
    { label: "$$\\text{pit}$$", value: false },
    { label: "$$\\text{sit}$$", value: false },
    { label: "$$\\text{nit}$$", value: true },
    { label: "tidak ada satupun", value: false },
  ],
};

export default choices;
