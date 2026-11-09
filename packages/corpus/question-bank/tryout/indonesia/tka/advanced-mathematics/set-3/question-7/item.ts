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
          label: "Nilai $$a$$ adalah $$3$$.",
        },
        {
          correct: true,
          label: "Nilai $$b$$ adalah $$1$$.",
        },
        {
          correct: true,
          label: "$$x+3$$ adalah faktor dari $$P(x)$$.",
        },
        {
          correct: false,
          label: "Sisa pembagian $$P(x)$$ oleh $$x-2$$ adalah $$12$$.",
        },
        {
          correct: true,
          label:
            "Jumlah kuadrat semua akar persamaan $$P(x)=0$$ adalah $$14$$.",
        },
      ],
    },
  },
};

export default item;
