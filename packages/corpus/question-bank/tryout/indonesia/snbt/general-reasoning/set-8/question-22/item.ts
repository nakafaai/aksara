import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$20\\%$$",
        },
        {
          isCorrect: false,
          label: "$$22\\%$$",
        },
        {
          isCorrect: false,
          label: "$$27{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$30\\%$$",
        },
        {
          isCorrect: true,
          label: "$$25\\%$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$20\\%$$",
        },
        {
          isCorrect: false,
          label: "$$22\\%$$",
        },
        {
          isCorrect: false,
          label: "$$27{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$30\\%$$",
        },
        {
          isCorrect: true,
          label: "$$25\\%$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$20\\%$$",
        },
        {
          isCorrect: false,
          label: "$$22\\%$$",
        },
        {
          isCorrect: false,
          label: "$$27{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$30\\%$$",
        },
        {
          isCorrect: true,
          label: "$$25\\%$$",
        },
      ],
    },
  },
};

export default item;
