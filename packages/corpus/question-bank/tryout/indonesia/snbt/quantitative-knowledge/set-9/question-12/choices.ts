import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$25.0\\%$$", value: false },
    { label: "$$37.5\\%$$", value: false },
    { label: "$$50.0\\%$$", value: false },
    { label: "$$62.5\\%$$", value: false },
    { label: "$$66.7\\%$$", value: true },
  ],
  id: [
    { label: "$$25{,}0\\%$$", value: false },
    { label: "$$37{,}5\\%$$", value: false },
    { label: "$$50{,}0\\%$$", value: false },
    { label: "$$62{,}5\\%$$", value: false },
    { label: "$$66{,}7\\%$$", value: true },
  ],
};

export default choices;
