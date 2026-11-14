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
          label: "$$y\\ge-6$$",
        },
        {
          correct: true,
          label: "$$-6\\le y\\le30$$",
        },
        {
          correct: false,
          label: "$$-5\\le y\\le30$$",
        },
        {
          correct: false,
          label: "$$-1\\le y\\le8$$",
        },
        {
          correct: false,
          label: "$$3\\le y\\le30$$",
        },
      ],
    },
  },
};

export default item;
