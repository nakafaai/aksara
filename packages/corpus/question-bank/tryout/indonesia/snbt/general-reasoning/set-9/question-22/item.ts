import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$50\\%$$",
        },
        {
          isCorrect: false,
          label: "$$52{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$57{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$60\\%$$",
        },
        {
          isCorrect: true,
          label: "$$55\\%$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$50\\%$$",
        },
        {
          isCorrect: false,
          label: "$$52{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$57{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$60\\%$$",
        },
        {
          isCorrect: true,
          label: "$$55\\%$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$50\\%$$",
        },
        {
          isCorrect: false,
          label: "$$52{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$57{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$60\\%$$",
        },
        {
          isCorrect: true,
          label: "$$55\\%$$",
        },
      ],
    },
  },
};

export default item;
