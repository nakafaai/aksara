import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "trigonometry",
    topic: "trigonometric-ratios",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$(30\\sqrt3+1{,}6)$$ m",
        },
        {
          correct: false,
          label: "$$(10\\sqrt3+1{,}6)$$ m",
        },
        {
          correct: false,
          label: "$$30\\sqrt3$$ m",
        },
        {
          correct: false,
          label: "$$(15+1{,}6)$$ m",
        },
        {
          correct: false,
          label: "$$(60+1{,}6)$$ m",
        },
      ],
    },
  },
};

export default item;
