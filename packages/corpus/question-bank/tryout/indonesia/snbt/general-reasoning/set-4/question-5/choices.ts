import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$57\\text{ kcal}$$", value: false },
    { label: "$$70\\text{ kcal}$$", value: false },
    { label: "$$75\\text{ kcal}$$", value: true },
    { label: "$$72\\text{ kcal}$$", value: false },
    { label: "$$87.72\\text{ kcal}$$", value: false },
  ],
  id: [
    { label: "$$57\\text{ kkal}$$", value: false },
    { label: "$$70\\text{ kkal}$$", value: false },
    { label: "$$75\\text{ kkal}$$", value: true },
    { label: "$$72\\text{ kkal}$$", value: false },
    { label: "$$87{,}72\\text{ kkal}$$", value: false },
  ],
};

export default choices;
