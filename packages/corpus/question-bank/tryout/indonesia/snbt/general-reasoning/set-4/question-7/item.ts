import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$A = B$$ atau $$E \\neq F$$",
        },
        {
          isCorrect: false,
          label: "Jika $$A = B$$, maka $$E = F$$",
        },
        {
          isCorrect: false,
          label: "$$A = B$$ atau $$E = F$$",
        },
        {
          isCorrect: false,
          label: "$$A \\neq B$$ dan $$E = F$$",
        },
        {
          isCorrect: false,
          label: "$$E \\neq F$$ atau $$A \\neq B$$",
        },
      ],
    },
  },
};

export default item;
