import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "deductive-reasoning",
    topic: "rule-application",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}80{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}110{.}400$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}116{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}120{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}128{.}000$$",
        },
      ],
    },
  },
};

export default item;
