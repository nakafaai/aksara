import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\text{MMM}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{NNN}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{PPP}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{QQQ}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{RRR}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$\\text{MMM}$$" },
        { isCorrect: false, label: "$$\\text{NNN}$$" },
        { isCorrect: false, label: "$$\\text{PPP}$$" },
        { isCorrect: false, label: "$$\\text{QQQ}$$" },
        { isCorrect: false, label: "$$\\text{RRR}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$\\text{MMM}$$" },
        { isCorrect: false, label: "$$\\text{NNN}$$" },
        { isCorrect: false, label: "$$\\text{PPP}$$" },
        { isCorrect: false, label: "$$\\text{QQQ}$$" },
        { isCorrect: false, label: "$$\\text{RRR}$$" },
      ],
    },
  },
};

export default item;
