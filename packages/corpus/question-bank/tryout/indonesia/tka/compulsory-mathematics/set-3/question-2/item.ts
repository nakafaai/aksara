import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  stimulus: "streaming-plans",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2{.}880$$",
        },
        {
          correct: true,
          label: "$$3{.}920$$",
        },
        {
          correct: false,
          label: "$$4{.}000$$",
        },
        {
          correct: false,
          label: "$$4{.}080$$",
        },
        {
          correct: false,
          label: "$$6{.}000$$",
        },
      ],
    },
  },
};

export default item;
