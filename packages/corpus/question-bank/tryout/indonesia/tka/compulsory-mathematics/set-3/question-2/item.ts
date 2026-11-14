import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  stimulus: "tiket",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: true,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$9$$",
        },
      ],
    },
  },
};

export default item;
