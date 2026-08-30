import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A = B$$ dann $$E = F$$",
        },
        {
          isCorrect: false,
          label: "$$A = B$$ oder $$E = F$$",
        },
        {
          isCorrect: false,
          label: "$$A \\neq B$$ und $$E = F$$",
        },
        {
          isCorrect: true,
          label: "$$A = B$$ oder $$E \\neq F$$",
        },
        {
          isCorrect: false,
          label: "$$E \\neq F$$ oder $$A \\neq B$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A = B$$ then $$E = F$$",
        },
        {
          isCorrect: false,
          label: "$$A = B$$ or $$E = F$$",
        },
        {
          isCorrect: false,
          label: "$$A \\neq B$$ and $$E = F$$",
        },
        {
          isCorrect: true,
          label: "$$A = B$$ or $$E \\neq F$$",
        },
        {
          isCorrect: false,
          label: "$$E \\neq F$$ or $$A \\neq B$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A = B$$ maka $$E = F$$",
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
          isCorrect: true,
          label: "$$A = B$$ atau $$E \\neq F$$",
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
