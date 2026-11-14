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
          label: "Nilai $$a$$ adalah $$2$$.",
        },
        {
          correct: true,
          label: "$$a+b=-4$$",
        },
        {
          correct: true,
          label: "Persamaan $$P(x)=0$$ memiliki tepat satu akar real.",
        },
        {
          correct: false,
          label: "$$x+1$$ adalah faktor dari $$P(x)$$.",
        },
        {
          correct: true,
          label: "Sisa pembagian $$P(x)$$ oleh $$x-1$$ adalah $$-6$$.",
        },
      ],
    },
  },
};

export default item;
