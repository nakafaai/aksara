import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Nama ibu kandungnya",
      value: false,
    },
    {
      label: "Tempat kelahirannya",
      value: false,
    },
    {
      label: "Tahun kelahirannya",
      value: false,
    },
    {
      label: "Identitas ayah biologisnya",
      value: true,
    },
    {
      label: "Nama keluarga asuhnya",
      value: false,
    },
  ],
};

export default choices;
