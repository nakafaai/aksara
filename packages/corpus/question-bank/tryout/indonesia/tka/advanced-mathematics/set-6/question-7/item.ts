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
          label: "Sisa pembagian $$P(x)$$ oleh $$x-2$$ adalah $$4$$.",
        },
        {
          correct: false,
          label: "$$x+1$$ adalah faktor dari $$P(x)$$.",
        },
        {
          correct: true,
          label: "Sisa pembagian $$P(x)$$ oleh $$x^2-1$$ adalah $$2x-3$$.",
        },
        {
          correct: true,
          label: "Hasil bagi $$P(x)$$ oleh $$x-1$$ adalah $$x^3-2x^2+5$$.",
        },
        {
          correct: false,
          label: "$$P(3)=21$$",
        },
      ],
    },
  },
};

export default item;
