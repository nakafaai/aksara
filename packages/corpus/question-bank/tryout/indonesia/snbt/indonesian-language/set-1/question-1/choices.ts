import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Berani mengambil resiko",
      value: true,
    },
    {
      label: "Mengutamakan kenyamanan kerja",
      value: false,
    },
    {
      label: "Sangat teliti dan ulet",
      value: false,
    },
    {
      label: "Sosok yang rapih",
      value: false,
    },
    {
      label: "Peduli terhadap kemanusiaan",
      value: false,
    },
  ],
};

export default choices;
