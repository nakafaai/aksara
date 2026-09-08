import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P + Q = 12x$$",
        },
        {
          isCorrect: true,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label:
            "Die Angaben reichen nicht aus, um die Beziehung zu bestimmen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P + Q = 12x$$",
        },
        {
          isCorrect: true,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label:
            "The information provided is insufficient to determine the relationship.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P + Q = 12x$$",
        },
        {
          isCorrect: true,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label:
            "Informasi yang diberikan tidak cukup untuk menentukan hubungan keduanya.",
        },
      ],
    },
  },
};

export default item;
