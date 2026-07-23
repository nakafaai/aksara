import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Quantity $$P$$ is greater than $$Q$$",
      value: true,
    },
    {
      label: "Quantity $$P$$ is less than $$Q$$",
      value: false,
    },
    {
      label: "Quantity $$P$$ is equal to $$Q$$",
      value: false,
    },
    {
      label: "The information is insufficient to determine the relationship",
      value: false,
    },
    {
      label: "Cannot be determined",
      value: false,
    },
  ],
  id: [
    {
      label: "Kuantitas $$P$$ lebih besar daripada $$Q$$",
      value: true,
    },
    {
      label: "Kuantitas $$P$$ lebih kecil daripada $$Q$$",
      value: false,
    },
    {
      label: "Kuantitas $$P$$ sama dengan $$Q$$",
      value: false,
    },
    {
      label: "Informasi tidak cukup untuk menentukan hubungan",
      value: false,
    },
    {
      label: "Tidak dapat ditentukan",
      value: false,
    },
  ],
};

export default choices;
