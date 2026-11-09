import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$9$$",
        },
        {
          correct: true,
          label: "$$11$$",
        },
        {
          correct: false,
          label: "$$13$$",
        },
        {
          correct: false,
          label: "$$17$$",
        },
        {
          correct: false,
          label: "$$22$$",
        },
      ],
    },
  },
};

export default item;
