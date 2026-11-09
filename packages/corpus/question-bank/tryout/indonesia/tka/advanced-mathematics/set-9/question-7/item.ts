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
          label: "$$x-4$$ adalah faktor $$P(x)$$.",
        },
        {
          correct: false,
          label: "Sisa pembagian $$P(x)$$ oleh $$x+1$$ adalah $$12$$.",
        },
        {
          correct: true,
          label: "Jumlah semua akar persamaan $$P(x)=0$$ adalah $$3$$.",
        },
        {
          correct: true,
          label: "$$P(x)$$ habis dibagi $$4x^2+4x-3$$.",
        },
        {
          correct: false,
          label: "$$P(x)>0$$ untuk setiap $$x>\\frac12$$.",
        },
      ],
    },
  },
};

export default item;
