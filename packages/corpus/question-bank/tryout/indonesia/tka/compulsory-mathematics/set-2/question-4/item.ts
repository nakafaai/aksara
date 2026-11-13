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
          label: "$$32$$",
        },
        {
          correct: false,
          label: "$$29$$",
        },
        {
          correct: false,
          label: "$$17$$",
        },
        {
          correct: false,
          label: "$$11$$",
        },
        {
          correct: true,
          label: "$$9$$",
        },
      ],
    },
  },
};

export default item;
