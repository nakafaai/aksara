import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$23$$ Schülerinnen und Schüler",
        },
        {
          isCorrect: false,
          label: "$$24$$ Schülerinnen und Schüler",
        },
        {
          isCorrect: false,
          label: "$$25$$ Schülerinnen und Schüler",
        },
        {
          isCorrect: true,
          label: "$$22$$ Schülerinnen und Schüler",
        },
        {
          isCorrect: false,
          label: "$$26$$ Schülerinnen und Schüler",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$23$$ students",
        },
        {
          isCorrect: false,
          label: "$$24$$ students",
        },
        {
          isCorrect: false,
          label: "$$25$$ students",
        },
        {
          isCorrect: true,
          label: "$$22$$ students",
        },
        {
          isCorrect: false,
          label: "$$26$$ students",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$23$$ siswa",
        },
        {
          isCorrect: false,
          label: "$$24$$ siswa",
        },
        {
          isCorrect: false,
          label: "$$25$$ siswa",
        },
        {
          isCorrect: true,
          label: "$$22$$ siswa",
        },
        {
          isCorrect: false,
          label: "$$26$$ siswa",
        },
      ],
    },
  },
};

export default item;
