import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$10\\%$$", value: false },
    { label: "$$20\\%$$", value: false },
    { label: "$$25\\%$$", value: false },
    { label: "$$30\\%$$", value: true },
    { label: "$$70\\%$$", value: false },
  ],
  id: [
    { label: "$$10\\%$$", value: false },
    { label: "$$20\\%$$", value: false },
    { label: "$$25\\%$$", value: false },
    { label: "$$30\\%$$", value: true },
    { label: "$$70\\%$$", value: false },
  ],
};

export default choices;
