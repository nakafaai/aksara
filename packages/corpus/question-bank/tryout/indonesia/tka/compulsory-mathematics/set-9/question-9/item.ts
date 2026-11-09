import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$a<0$$",
        },
        {
          correct: false,
          label: "$$b<0$$",
        },
        {
          correct: true,
          label: "$$c>0$$",
        },
        {
          correct: true,
          label: "Persamaan $$f(x)=0$$ mempunyai dua akar real yang berbeda.",
        },
        {
          correct: false,
          label: "$$abc>0$$",
        },
      ],
    },
  },
};

export default item;
