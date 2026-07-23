import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$1.2 \\text{ minutes}$$", value: false },
    { label: "$$4.8 \\text{ minutes}$$", value: false },
    { label: "$$18.8 \\text{ minutes}$$", value: false },
    { label: "$$16.8 \\text{ minutes}$$", value: true },
    { label: "$$14.2 \\text{ minutes}$$", value: false },
  ],
  id: [
    { label: "$$1{,}2 \\text{ menit}$$", value: false },
    { label: "$$4{,}8 \\text{ menit}$$", value: false },
    { label: "$$18{,}8 \\text{ menit}$$", value: false },
    { label: "$$16{,}8 \\text{ menit}$$", value: true },
    { label: "$$14{,}2 \\text{ menit}$$", value: false },
  ],
};

export default choices;
