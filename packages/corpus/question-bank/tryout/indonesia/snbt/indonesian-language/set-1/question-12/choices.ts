import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Ilmu",
      value: false,
    },
    {
      label: "Pengalaman",
      value: false,
    },
    {
      label: "Nasihat",
      value: true,
    },
    {
      label: "Kesan",
      value: false,
    },
    {
      label: "Perasaan",
      value: false,
    },
  ],
};

export default choices;
