import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$41\\text{ hours }15\\text{ minutes}$$", value: true },
    { label: "$$41\\text{ hours }25\\text{ minutes}$$", value: false },
    { label: "$$42\\text{ hours }15\\text{ minutes}$$", value: false },
    { label: "$$42\\text{ hours }25\\text{ minutes}$$", value: false },
    { label: "$$42\\text{ hours }45\\text{ minutes}$$", value: false },
  ],
  id: [
    { label: "$$41\\text{ jam }15\\text{ menit}$$", value: true },
    { label: "$$41\\text{ jam }25\\text{ menit}$$", value: false },
    { label: "$$42\\text{ jam }15\\text{ menit}$$", value: false },
    { label: "$$42\\text{ jam }25\\text{ menit}$$", value: false },
    { label: "$$42\\text{ jam }45\\text{ menit}$$", value: false },
  ],
};

export default choices;
