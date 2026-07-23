import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$1\\text{ hour}$$", value: false },
    { label: "$$1\\text{ hour} 30\\text{ minutes}$$", value: false },
    { label: "$$2\\text{ hours}$$", value: false },
    { label: "$$2\\text{ hours} 30\\text{ minutes}$$", value: false },
    { label: "$$3\\text{ hours}$$", value: true },
  ],
  id: [
    { label: "$$1\\text{ jam}$$", value: false },
    { label: "$$1\\text{ jam} 30\\text{ menit}$$", value: false },
    { label: "$$2\\text{ jam}$$", value: false },
    { label: "$$2\\text{ jam} 30\\text{ menit}$$", value: false },
    { label: "$$3\\text{ jam}$$", value: true },
  ],
};

export default choices;
