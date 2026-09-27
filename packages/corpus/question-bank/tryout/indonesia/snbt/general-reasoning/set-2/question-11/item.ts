import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{,}1$$ juta ton",
        },
        {
          isCorrect: false,
          label: "$$2{,}5$$ juta ton",
        },
        {
          isCorrect: false,
          label: "$$3{,}0$$ juta ton",
        },
        {
          isCorrect: true,
          label: "$$1{,}8$$ juta ton",
        },
        {
          isCorrect: false,
          label: "Tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
