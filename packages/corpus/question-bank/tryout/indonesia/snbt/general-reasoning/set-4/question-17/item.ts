import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$40\\text{ km}$$" },
        { isCorrect: false, label: "$$30\\text{ km}$$" },
        { isCorrect: false, label: "$$20\\text{ km}$$" },
        { isCorrect: true, label: "$$10\\text{ km}$$" },
        { isCorrect: false, label: "$$5\\text{ km}$$" },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$40\\text{ km}$$" },
        { isCorrect: false, label: "$$30\\text{ km}$$" },
        { isCorrect: false, label: "$$20\\text{ km}$$" },
        { isCorrect: true, label: "$$10\\text{ km}$$" },
        { isCorrect: false, label: "$$5\\text{ km}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$40\\text{ km}$$" },
        { isCorrect: false, label: "$$30\\text{ km}$$" },
        { isCorrect: false, label: "$$20\\text{ km}$$" },
        { isCorrect: true, label: "$$10\\text{ km}$$" },
        { isCorrect: false, label: "$$5\\text{ km}$$" },
      ],
    },
  },
};

export default item;
