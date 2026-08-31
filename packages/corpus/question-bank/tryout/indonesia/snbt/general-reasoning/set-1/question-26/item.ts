import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: true,
          label: "$$A$$",
        },
        {
          isCorrect: false,
          label: "$$A\\mathbin{/}B$$",
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
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: true,
          label: "$$A$$",
        },
        {
          isCorrect: false,
          label: "$$A\\mathbin{/}B$$",
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
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: true,
          label: "$$A$$",
        },
        {
          isCorrect: false,
          label: "$$A\\mathbin{/}B$$",
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
