import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$85\\text{ mg}$$",
        },
        {
          correct: false,
          label: "$$240\\text{ mg}$$",
        },
        {
          correct: false,
          label: "$$340\\text{ mg}$$",
        },
        {
          correct: false,
          label: "$$480\\text{ mg}$$",
        },
        {
          correct: false,
          label: "$$1{.}024\\text{ mg}$$",
        },
      ],
    },
  },
};

export default item;
