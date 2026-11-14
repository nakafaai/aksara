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
          label: "$$x-1$$ adalah faktor dari $$P(x)$$.",
        },
        {
          correct: true,
          label: "$$P(x)=(x+1)(x-2)(x+3)$$",
        },
        {
          correct: false,
          label: "Sisa pembagian $$P(x)$$ oleh $$x+2$$ adalah $$-4$$.",
        },
        {
          correct: true,
          label: "Jumlah semua akar persamaan $$P(x)=0$$ adalah $$-2$$.",
        },
        {
          correct: true,
          label: "$$P(x)<0$$ untuk setiap $$x$$ dengan $$-1<x<2$$.",
        },
      ],
    },
  },
};

export default item;
