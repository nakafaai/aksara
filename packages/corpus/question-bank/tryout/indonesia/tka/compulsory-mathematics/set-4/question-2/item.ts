import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp}14{.}100$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}16{.}875$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}17{.}500$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp}17{.}625$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}21{.}875$$",
        },
      ],
    },
  },
};

export default item;
