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
          label: "$$x-3$$ adalah faktor dari $$P(x)$$.",
        },
        {
          correct: true,
          label: "Jumlah semua akar persamaan $$P(x)=0$$ adalah $$\\frac32$$.",
        },
        {
          correct: false,
          label: "Sisa pembagian $$P(x)$$ oleh $$x+1$$ adalah $$8$$.",
        },
        {
          correct: true,
          label: "$$P(x)$$ habis dibagi $$2x-1$$.",
        },
        {
          correct: false,
          label: "Hasil kali semua akar persamaan $$P(x)=0$$ adalah $$3$$.",
        },
      ],
    },
  },
};

export default item;
