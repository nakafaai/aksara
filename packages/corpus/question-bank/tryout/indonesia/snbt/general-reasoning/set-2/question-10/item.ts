import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ große Äpfel",
        },
        {
          isCorrect: false,
          label: "$$2$$ kleine Äpfel",
        },
        {
          isCorrect: false,
          label: "$$2$$ große Orangen",
        },
        {
          isCorrect: false,
          label: "$$2$$ kleine Orangen",
        },
        {
          isCorrect: true,
          label: "$$1$$ großer Apfel und $$1$$ kleine Orange",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ large apples",
        },
        {
          isCorrect: false,
          label: "$$2$$ small apples",
        },
        {
          isCorrect: false,
          label: "$$2$$ large oranges",
        },
        {
          isCorrect: false,
          label: "$$2$$ small oranges",
        },
        {
          isCorrect: true,
          label: "$$1$$ large apple and $$1$$ small orange",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ apel besar",
        },
        {
          isCorrect: false,
          label: "$$2$$ apel kecil",
        },
        {
          isCorrect: false,
          label: "$$2$$ jeruk besar",
        },
        {
          isCorrect: false,
          label: "$$2$$ jeruk kecil",
        },
        {
          isCorrect: true,
          label: "$$1$$ apel besar dan $$1$$ jeruk kecil",
        },
      ],
    },
  },
};

export default item;
