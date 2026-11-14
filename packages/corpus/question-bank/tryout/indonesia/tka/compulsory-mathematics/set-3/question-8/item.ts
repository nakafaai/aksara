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
          label: "$$3{.}584$$",
        },
        {
          correct: false,
          label: "$$1{.}792$$",
        },
        {
          correct: false,
          label: "$$1{.}536$$",
        },
        {
          correct: false,
          label: "$$1{.}001$$",
        },
        {
          correct: false,
          label: "$$-1{.}792$$",
        },
      ],
    },
  },
};

export default item;
