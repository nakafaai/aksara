import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "raises blood pressure",
      value: true,
    },
    {
      label: "lowers blood pressure",
      value: false,
    },
    {
      label: "prevents cardiovascular disease",
      value: false,
    },
    {
      label: "accelerates digestion",
      value: false,
    },
    {
      label: "removes the body's need for potassium",
      value: false,
    },
  ],
  id: [
    {
      label: "meningkatkan tekanan darah",
      value: true,
    },
    {
      label: "menurunkan tekanan darah",
      value: false,
    },
    {
      label: "mencegah penyakit kardiovaskular",
      value: false,
    },
    {
      label: "mempercepat pencernaan",
      value: false,
    },
    {
      label: "menghilangkan kebutuhan tubuh akan kalium",
      value: false,
    },
  ],
};

export default choices;
