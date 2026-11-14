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
          label: "$$17{,}5\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$18\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$14\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$22\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$10\\sqrt{2}\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
