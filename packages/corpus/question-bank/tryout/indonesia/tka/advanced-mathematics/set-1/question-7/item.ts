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
          label: "$$x+1$$ adalah faktor dari $$Q(x)$$.",
        },
        {
          correct: false,
          label: "$$x+2$$ adalah faktor dari $$Q(x)$$.",
        },
        {
          correct: true,
          label: "Sisa pembagian $$Q(x)$$ oleh $$x-4$$ adalah $$30$$.",
        },
        {
          correct: false,
          label: "Persamaan $$Q(x)=0$$ memiliki tepat dua akar positif.",
        },
        {
          correct: true,
          label: "Hasil kali semua akar persamaan $$Q(x)=0$$ adalah $$-6$$.",
        },
      ],
    },
  },
};

export default item;
