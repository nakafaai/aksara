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
          isCorrect: false,
          label: "$$A\\mathbin{/}B$$",
        },
        {
          isCorrect: false,
          label: "$$B\\mathbin{/}C$$",
        },
        {
          isCorrect: true,
          label: "$$A$$",
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
          isCorrect: false,
          label: "$$A\\mathbin{/}B$$",
        },
        {
          isCorrect: false,
          label: "$$B\\mathbin{/}C$$",
        },
        {
          isCorrect: true,
          label: "$$A$$",
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
          isCorrect: false,
          label: "$$A\\mathbin{/}B$$",
        },
        {
          isCorrect: false,
          label: "$$B\\mathbin{/}C$$",
        },
        {
          isCorrect: true,
          label: "$$A$$",
        },
      ],
    },
  },
};

export default item;
