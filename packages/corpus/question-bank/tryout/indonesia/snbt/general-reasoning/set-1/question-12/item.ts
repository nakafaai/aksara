import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$72\\text{ Stunden}$$",
        },
        {
          isCorrect: false,
          label: "$$132\\text{ Stunden}$$",
        },
        {
          isCorrect: true,
          label: "$$144\\text{ Stunden}$$",
        },
        {
          isCorrect: false,
          label: "$$240\\text{ Stunden}$$",
        },
        {
          isCorrect: false,
          label: "$$360\\text{ Stunden}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$72\\text{ hours}$$" },
        { isCorrect: false, label: "$$132\\text{ hours}$$" },
        { isCorrect: true, label: "$$144\\text{ hours}$$" },
        { isCorrect: false, label: "$$240\\text{ hours}$$" },
        { isCorrect: false, label: "$$360\\text{ hours}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$72\\text{ jam}$$" },
        { isCorrect: false, label: "$$132\\text{ jam}$$" },
        { isCorrect: true, label: "$$144\\text{ jam}$$" },
        { isCorrect: false, label: "$$240\\text{ jam}$$" },
        { isCorrect: false, label: "$$360\\text{ jam}$$" },
      ],
    },
  },
};

export default item;
