import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$1\\text{ hour }15\\text{ minutes}$$", value: true },
    { label: "$$1\\text{ hour }20\\text{ minutes}$$", value: false },
    { label: "$$1\\text{ hour }25\\text{ minutes}$$", value: false },
    { label: "$$2\\text{ hours }15\\text{ minutes}$$", value: false },
    { label: "$$2\\text{ hours }20\\text{ minutes}$$", value: false },
  ],
  id: [
    { label: "$$1\\text{ jam }15\\text{ menit}$$", value: true },
    { label: "$$1\\text{ jam }20\\text{ menit}$$", value: false },
    { label: "$$1\\text{ jam }25\\text{ menit}$$", value: false },
    { label: "$$2\\text{ jam }15\\text{ menit}$$", value: false },
    { label: "$$2\\text{ jam }20\\text{ menit}$$", value: false },
  ],
};

export default choices;
