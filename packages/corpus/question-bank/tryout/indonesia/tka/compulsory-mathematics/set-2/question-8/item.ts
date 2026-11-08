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
          correct: false,
          label: "$$1{.}400$$",
        },
        {
          correct: false,
          label: "$$3{.}600$$",
        },
        {
          correct: false,
          label: "$$48{.}600$$",
        },
        {
          correct: true,
          label: "$$145{.}800$$",
        },
        {
          correct: false,
          label: "$$437{.}400$$",
        },
      ],
    },
  },
};

export default item;
