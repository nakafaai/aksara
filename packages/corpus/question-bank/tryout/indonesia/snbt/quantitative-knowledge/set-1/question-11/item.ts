import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Größe $$P$$ ist kleiner als $$Q$$",
        },
        {
          isCorrect: false,
          label: "Größe $$P$$ ist gleich $$Q$$",
        },
        {
          isCorrect: true,
          label: "Größe $$P$$ ist größer als $$Q$$",
        },
        {
          isCorrect: false,
          label:
            "Die Informationen reichen nicht aus, um den Zusammenhang festzustellen",
        },
        {
          isCorrect: false,
          label: "Beide Größen sind nicht definiert",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Quantity $$P$$ is less than $$Q$$",
        },
        {
          isCorrect: false,
          label: "Quantity $$P$$ is equal to $$Q$$",
        },
        {
          isCorrect: true,
          label: "Quantity $$P$$ is greater than $$Q$$",
        },
        {
          isCorrect: false,
          label:
            "The information is insufficient to determine the relationship",
        },
        {
          isCorrect: false,
          label: "Neither quantity is defined",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kuantitas $$P$$ lebih kecil daripada $$Q$$",
        },
        {
          isCorrect: false,
          label: "Kuantitas $$P$$ sama dengan $$Q$$",
        },
        {
          isCorrect: true,
          label: "Kuantitas $$P$$ lebih besar daripada $$Q$$",
        },
        {
          isCorrect: false,
          label: "Informasi tidak cukup untuk menentukan hubungan",
        },
        {
          isCorrect: false,
          label: "Kedua kuantitas tidak terdefinisi",
        },
      ],
    },
  },
};

export default item;
