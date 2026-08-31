import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A$$",
        },
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: true,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "$$A\\mathbin{/}C$$",
        },
        {
          isCorrect: false,
          label: "$$B\\mathbin{/}C$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A$$",
        },
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: true,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "$$A\\mathbin{/}C$$",
        },
        {
          isCorrect: false,
          label: "$$B\\mathbin{/}C$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A$$",
        },
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: true,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "$$A\\mathbin{/}C$$",
        },
        {
          isCorrect: false,
          label: "$$B\\mathbin{/}C$$",
        },
      ],
    },
  },
};

export default item;
