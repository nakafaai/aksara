import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
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
