import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3\\le x\\}$$",
        },
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x\\}$$",
        },
        {
          isCorrect: true,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x\\le7\\}$$",
        },
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid x\\le7\\}$$",
        },
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x<7\\}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3\\le x\\}$$",
        },
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x\\}$$",
        },
        {
          isCorrect: true,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x\\le7\\}$$",
        },
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid x\\le7\\}$$",
        },
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x<7\\}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3\\le x\\}$$",
        },
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x\\}$$",
        },
        {
          isCorrect: true,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x\\le7\\}$$",
        },
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid x\\le7\\}$$",
        },
        {
          isCorrect: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x<7\\}$$",
        },
      ],
    },
  },
};

export default item;
