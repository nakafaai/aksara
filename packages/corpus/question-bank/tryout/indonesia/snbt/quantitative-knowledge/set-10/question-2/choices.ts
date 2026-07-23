import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$90 - x$$", value: false },
    { label: "$$90 - 2x$$", value: false },
    { label: "$$180 - x$$", value: false },
    { label: "$$180 - 2x$$", value: true },
    { label: "Unknown", value: false },
  ],
  id: [
    { label: "$$90 - x$$", value: false },
    { label: "$$90 - 2x$$", value: false },
    { label: "$$180 - x$$", value: false },
    { label: "$$180 - 2x$$", value: true },
    { label: "Tidak diketahui", value: false },
  ],
};

export default choices;
