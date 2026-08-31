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
          isCorrect: false,
          label: "$$A\\mathbin{/}B$$",
        },
        {
          isCorrect: false,
          label: "$$B\\mathbin{/}C$$",
        },
        {
          isCorrect: true,
          label: "$$C$$",
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
          isCorrect: false,
          label: "$$A\\mathbin{/}B$$",
        },
        {
          isCorrect: false,
          label: "$$B\\mathbin{/}C$$",
        },
        {
          isCorrect: true,
          label: "$$C$$",
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
          isCorrect: false,
          label: "$$A\\mathbin{/}B$$",
        },
        {
          isCorrect: false,
          label: "$$B\\mathbin{/}C$$",
        },
        {
          isCorrect: true,
          label: "$$C$$",
        },
      ],
    },
  },
};

export default item;
