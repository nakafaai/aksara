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
          label: "Persamaan $$P(x)=0$$ memiliki empat akar real.",
        },
        {
          correct: true,
          label: "Jumlah semua akar persamaan $$P(x)=0$$ adalah $$0$$.",
        },
        {
          correct: false,
          label: "$$P(x)$$ habis dibagi $$x^2+1$$.",
        },
        {
          correct: true,
          label:
            "Hasil kali semua akar persamaan $$P(x)=0$$ adalah $$\\frac{25}{9}$$.",
        },
        {
          correct: false,
          label: "Sisa pembagian $$P(x)$$ oleh $$2x-5$$ adalah $$100$$.",
        },
      ],
    },
  },
};

export default item;
