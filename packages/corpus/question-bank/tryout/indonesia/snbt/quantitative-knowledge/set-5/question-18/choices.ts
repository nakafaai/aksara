import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$P > Q$$", value: false },
    { label: "$$P < Q$$", value: false },
    { label: "$$P = Q$$", value: true },
    { label: "$$P + Q = 12x$$", value: false },
    {
      label:
        "The information provided is not sufficient to decide on one of the four choices above",
      value: false,
    },
  ],
  id: [
    { label: "$$P > Q$$", value: false },
    { label: "$$P < Q$$", value: false },
    { label: "$$P = Q$$", value: true },
    { label: "$$P + Q = 12x$$", value: false },
    {
      label:
        "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari keempat pilihan di atas",
      value: false,
    },
  ],
};

export default choices;
