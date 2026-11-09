import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\{y\\mid y<3,\\ y\\in\\mathbb{R}\\}$$",
        },
        {
          correct: false,
          label: "$$\\{y\\mid y>3,\\ y\\in\\mathbb{R}\\}$$",
        },
        {
          correct: false,
          label: "$$\\{y\\mid y\\leq3,\\ y\\in\\mathbb{R}\\}$$",
        },
        {
          correct: false,
          label: "$$\\{y\\mid y\\leq1,\\ y\\in\\mathbb{R}\\}$$",
        },
        {
          correct: false,
          label: "$$\\{y\\mid y\\in\\mathbb{R}\\}$$",
        },
      ],
    },
  },
};

export default item;
