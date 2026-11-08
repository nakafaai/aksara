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
          label: "$$8{.}100$$ orang",
        },
        {
          correct: false,
          label: "$$9{.}600$$ orang",
        },
        {
          correct: false,
          label: "$$12{.}000$$ orang",
        },
        {
          correct: false,
          label: "$$12{.}150$$ orang",
        },
        {
          correct: false,
          label: "$$18{.}225$$ orang",
        },
      ],
    },
  },
};

export default item;
