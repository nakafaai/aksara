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
          correct: false,
          label: "$$c=3$$",
        },
        {
          correct: true,
          label: "$$a+b+c=0$$",
        },
        {
          correct: true,
          label: "$$x=1$$ adalah akar ganda persamaan $$2x^3-x^2-4x+3=0$$.",
        },
        {
          correct: false,
          label:
            "Persamaan $$2x^3-x^2-4x+3=0$$ mempunyai tiga akar real yang berbeda.",
        },
        {
          correct: true,
          label:
            "Hasil kali semua akar persamaan $$2x^3-x^2-4x+3=0$$ adalah $$-\\frac32$$.",
        },
      ],
    },
  },
};

export default item;
