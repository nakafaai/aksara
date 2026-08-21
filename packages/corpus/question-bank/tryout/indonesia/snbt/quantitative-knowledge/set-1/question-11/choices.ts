import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Größe $$P$$ ist größer als $$Q$$",
      value: true,
    },
    {
      label: "Größe $$P$$ ist kleiner als $$Q$$",
      value: false,
    },
    {
      label: "Größe $$P$$ ist gleich $$Q$$",
      value: false,
    },
    {
      label:
        "Die Informationen reichen nicht aus, um den Zusammenhang festzustellen",
      value: false,
    },
    {
      label: "Beide Größen sind nicht definiert",
      value: false,
    },
  ],
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
      label: "Neither quantity is defined",
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
      label: "Kedua kuantitas tidak terdefinisi",
      value: false,
    },
  ],
};

export default choices;
