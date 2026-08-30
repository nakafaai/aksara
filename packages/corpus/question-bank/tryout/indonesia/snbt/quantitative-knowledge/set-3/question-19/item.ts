import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$1{,}5$$ cm",
        },
        {
          isCorrect: false,
          label: "$$2$$ cm",
        },
        {
          isCorrect: false,
          label: "$$2{,}5$$ cm",
        },
        {
          isCorrect: false,
          label: "$$3$$ cm",
        },
        {
          isCorrect: false,
          label: "$$3{,}5$$ cm",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$1.5$$ cm",
        },
        {
          isCorrect: false,
          label: "$$2$$ cm",
        },
        {
          isCorrect: false,
          label: "$$2.5$$ cm",
        },
        {
          isCorrect: false,
          label: "$$3$$ cm",
        },
        {
          isCorrect: false,
          label: "$$3.5$$ cm",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$1{,}5$$ cm",
        },
        {
          isCorrect: false,
          label: "$$2$$ cm",
        },
        {
          isCorrect: false,
          label: "$$2{,}5$$ cm",
        },
        {
          isCorrect: false,
          label: "$$3$$ cm",
        },
        {
          isCorrect: false,
          label: "$$3{,}5$$ cm",
        },
      ],
    },
  },
};

export default item;
