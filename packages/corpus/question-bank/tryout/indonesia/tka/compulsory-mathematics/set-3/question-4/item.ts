import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1,1)$$",
        },
        {
          isCorrect: false,
          label: "$$(0,2)$$",
        },
        {
          isCorrect: true,
          label: "$$(2,1)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,1)$$",
        },
        {
          isCorrect: false,
          label: "$$(1,0)$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1,1)$$",
        },
        {
          isCorrect: false,
          label: "$$(0,2)$$",
        },
        {
          isCorrect: true,
          label: "$$(2,1)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,1)$$",
        },
        {
          isCorrect: false,
          label: "$$(1,0)$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1,1)$$",
        },
        {
          isCorrect: false,
          label: "$$(0,2)$$",
        },
        {
          isCorrect: true,
          label: "$$(2,1)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,1)$$",
        },
        {
          isCorrect: false,
          label: "$$(1,0)$$",
        },
      ],
    },
  },
};

export default item;
