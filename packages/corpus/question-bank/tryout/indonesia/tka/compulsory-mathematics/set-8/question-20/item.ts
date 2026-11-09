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
          label: "$$9$$ m",
        },
        {
          correct: false,
          label: "$$11{,}25$$ m",
        },
        {
          correct: false,
          label: "$$12$$ m",
        },
        {
          correct: false,
          label: "$$18{,}75$$ m",
        },
        {
          correct: false,
          label: "$$25$$ m",
        },
      ],
    },
  },
};

export default item;
