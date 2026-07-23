import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

// Date: 2025-11-22
const choices: QuestionChoices = {
  en: [
    {
      label: "Quantity $$P$$ is greater than $$Q$$",
      value: false,
    },
    {
      label: "Quantity $$P$$ is less than $$Q$$",
      value: true,
    },
    {
      label: "Quantity $$P$$ is equal to $$Q$$",
      value: false,
    },
    {
      label:
        "The relationship between quantity $$P$$ and $$Q$$ cannot be determined",
      value: false,
    },
    {
      label:
        "The information provided is not sufficient to decide one of the three options above",
      value: false,
    },
  ],
  id: [
    {
      label: "Kuantitas $$P$$ lebih besar daripada $$Q$$",
      value: false,
    },
    {
      label: "Kuantitas $$P$$ lebih kecil daripada $$Q$$",
      value: true,
    },
    {
      label: "Kuantitas $$P$$ sama dengan $$Q$$",
      value: false,
    },
    {
      label: "Tidak dapat ditentukan hubungan antara kuantitas $$P$$ dan $$Q$$",
      value: false,
    },
    {
      label:
        "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari tiga pilihan di atas",
      value: false,
    },
  ],
};

export default choices;
