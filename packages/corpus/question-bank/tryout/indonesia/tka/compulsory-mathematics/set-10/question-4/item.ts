import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$14$$",
        },
        {
          correct: false,
          label: "$$11$$",
        },
        {
          correct: false,
          label: "$$9$$",
        },
        {
          correct: false,
          label: "$$7$$",
        },
        {
          correct: true,
          label: "$$6$$",
        },
      ],
    },
  },
};

export default item;
