import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$P > Q$$", value: false },
    { label: "$$P < Q$$", value: true },
    { label: "$$P = Q$$", value: false },
    { label: "$$P + Q = 3$$", value: false },
    { label: "Cannot be determined.", value: false },
  ],
  id: [
    { label: "$$P > Q$$", value: false },
    { label: "$$P < Q$$", value: true },
    { label: "$$P = Q$$", value: false },
    { label: "$$P + Q = 3$$", value: false },
    { label: "Tidak dapat ditentukan.", value: false },
  ],
};

export default choices;
