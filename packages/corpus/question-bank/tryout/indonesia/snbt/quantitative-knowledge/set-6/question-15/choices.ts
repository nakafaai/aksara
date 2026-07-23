import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$P > Q$$", value: false },
    { label: "$$P < Q$$", value: true },
    { label: "$$P = Q$$", value: false },
    { label: "$$P = 2Q$$", value: false },
    {
      label: "Cannot determine the relationship between $$P$$ and $$Q$$",
      value: false,
    },
  ],
  id: [
    { label: "$$P > Q$$", value: false },
    { label: "$$P < Q$$", value: true },
    { label: "$$P = Q$$", value: false },
    { label: "$$P = 2Q$$", value: false },
    { label: "Tidak dapat ditentukan hubungan $$P$$ dan $$Q$$", value: false },
  ],
};

export default choices;
