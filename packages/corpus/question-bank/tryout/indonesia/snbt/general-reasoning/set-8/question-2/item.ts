import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5\\%$$",
        },
        {
          isCorrect: true,
          label: "$$10\\%$$",
        },
        {
          isCorrect: false,
          label: "$$15\\%$$",
        },
        {
          isCorrect: false,
          label: "$$20\\%$$",
        },
        {
          isCorrect: false,
          label: "$$25\\%$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$5\\%$$" },
        { isCorrect: true, label: "$$10\\%$$" },
        { isCorrect: false, label: "$$15\\%$$" },
        { isCorrect: false, label: "$$20\\%$$" },
        { isCorrect: false, label: "$$25\\%$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$5\\%$$" },
        { isCorrect: true, label: "$$10\\%$$" },
        { isCorrect: false, label: "$$15\\%$$" },
        { isCorrect: false, label: "$$20\\%$$" },
        { isCorrect: false, label: "$$25\\%$$" },
      ],
    },
  },
};

export default item;
