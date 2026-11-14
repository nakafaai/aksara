import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "polynomials",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$x_1+x_2+x_3=\\frac52$$",
        },
        {
          correct: true,
          label: "$$x_1x_2x_3=-\\frac32$$",
        },
        {
          correct: false,
          label: "$$x_1x_2+x_1x_3+x_2x_3=2$$",
        },
        {
          correct: false,
          label: "Akar terbesar persamaan itu adalah $$\\frac12$$.",
        },
        {
          correct: true,
          label: "$$\\frac{1}{x_1}+\\frac{1}{x_2}+\\frac{1}{x_3}=\\frac43$$",
        },
      ],
    },
  },
};

export default item;
