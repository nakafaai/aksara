import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$10{:}01$$",
        },
        {
          isCorrect: false,
          label: "$$10{:}20$$",
        },
        {
          isCorrect: false,
          label: "$$10{:}36$$",
        },
        {
          isCorrect: true,
          label: "$$10{:}57$$",
        },
        {
          isCorrect: false,
          label: "$$11{:}02$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$10{:}01$$" },
        { isCorrect: false, label: "$$10{:}20$$" },
        { isCorrect: false, label: "$$10{:}36$$" },
        { isCorrect: true, label: "$$10{:}57$$" },
        { isCorrect: false, label: "$$11{:}02$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$10{:}01$$" },
        { isCorrect: false, label: "$$10{:}20$$" },
        { isCorrect: false, label: "$$10{:}36$$" },
        { isCorrect: true, label: "$$10{:}57$$" },
        { isCorrect: false, label: "$$11{:}02$$" },
      ],
    },
  },
};

export default item;
