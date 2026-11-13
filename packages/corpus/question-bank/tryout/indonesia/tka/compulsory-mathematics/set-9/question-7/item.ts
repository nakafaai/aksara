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
          label: "$$36\\le x\\le 44$$",
        },
        {
          correct: false,
          label: "$$30\\le x\\le 44$$",
        },
        {
          correct: false,
          label: "$$30\\le x\\le 50$$",
        },
        {
          correct: false,
          label: "$$31\\le x\\le 32$$ atau $$37\\le x\\le 43$$",
        },
        {
          correct: true,
          label: "$$30\\le x\\le 32$$ atau $$36\\le x\\le 44$$",
        },
      ],
    },
  },
};

export default item;
