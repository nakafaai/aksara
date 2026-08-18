import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Semua kelompok selalu mempunyai tujuan yang sama",
      value: false,
    },
    {
      label: "Perang tidak pernah menghasilkan perubahan politik",
      value: false,
    },
    {
      label:
        "Biaya perang memberi kedua pihak dorongan kuat untuk mencari kesepakatan",
      value: true,
    },
    {
      label: "Kelompok yang bertikai selalu memiliki informasi lengkap",
      value: false,
    },
    {
      label: "Lembaga internasional menyelesaikan setiap perselisihan",
      value: false,
    },
  ],
};

export default choices;
