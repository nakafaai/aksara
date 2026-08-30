import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Größe $$P$$ ist kleiner als Größe $$Q$$",
        },
        {
          isCorrect: false,
          label: "Größe $$P$$ ist größer als Größe $$Q$$",
        },
        {
          isCorrect: false,
          label: "Größe $$P$$ ist gleich Größe $$Q$$",
        },
        {
          isCorrect: false,
          label:
            "Die Beziehung zwischen den Größen $$P$$ und $$Q$$ lässt sich nicht bestimmen",
        },
        {
          isCorrect: false,
          label:
            "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der drei oben genannten Optionen zu entscheiden",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Quantity $$P$$ is less than $$Q$$",
        },
        {
          isCorrect: false,
          label: "Quantity $$P$$ is greater than $$Q$$",
        },
        {
          isCorrect: false,
          label: "Quantity $$P$$ is equal to $$Q$$",
        },
        {
          isCorrect: false,
          label:
            "The relationship between quantity $$P$$ and $$Q$$ cannot be determined",
        },
        {
          isCorrect: false,
          label:
            "The information provided is not sufficient to decide one of the three options above",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Kuantitas $$P$$ lebih kecil daripada $$Q$$",
        },
        {
          isCorrect: false,
          label: "Kuantitas $$P$$ lebih besar daripada $$Q$$",
        },
        {
          isCorrect: false,
          label: "Kuantitas $$P$$ sama dengan $$Q$$",
        },
        {
          isCorrect: false,
          label:
            "Tidak dapat ditentukan hubungan antara kuantitas $$P$$ dan $$Q$$",
        },
        {
          isCorrect: false,
          label:
            "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari tiga pilihan di atas",
        },
      ],
    },
  },
};

export default item;
