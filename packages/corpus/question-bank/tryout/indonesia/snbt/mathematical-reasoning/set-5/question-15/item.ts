import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$60 \\text{ Jahre}$$",
        },
        {
          isCorrect: false,
          label: "$$56 \\text{ Jahre}$$",
        },
        {
          isCorrect: true,
          label: "$$57 \\text{ Jahre}$$",
        },
        {
          isCorrect: false,
          label: "$$54 \\text{ Jahre}$$",
        },
        {
          isCorrect: false,
          label: "$$52 \\text{ Jahre}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$60 \\text{ years}$$",
        },
        {
          isCorrect: false,
          label: "$$56 \\text{ years}$$",
        },
        {
          isCorrect: true,
          label: "$$57 \\text{ years}$$",
        },
        {
          isCorrect: false,
          label: "$$54 \\text{ years}$$",
        },
        {
          isCorrect: false,
          label: "$$52 \\text{ years}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$60 \\text{ tahun}$$",
        },
        {
          isCorrect: false,
          label: "$$56 \\text{ tahun}$$",
        },
        {
          isCorrect: true,
          label: "$$57 \\text{ tahun}$$",
        },
        {
          isCorrect: false,
          label: "$$54 \\text{ tahun}$$",
        },
        {
          isCorrect: false,
          label: "$$52 \\text{ tahun}$$",
        },
      ],
    },
  },
};

export default item;
