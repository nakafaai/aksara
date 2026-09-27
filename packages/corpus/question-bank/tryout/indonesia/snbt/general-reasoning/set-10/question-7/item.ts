import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{MMM}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{PPP}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{NNN}$$",
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
  },
};

export default item;
