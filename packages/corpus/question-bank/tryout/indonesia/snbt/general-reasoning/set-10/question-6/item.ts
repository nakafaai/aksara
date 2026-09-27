import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
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
        {
          isCorrect: true,
          label: "$$\\text{MMM}$$",
        },
      ],
    },
  },
};

export default item;
