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
          label: "Hasil baginya adalah $$2x^2-3x+8$$.",
        },
        {
          correct: false,
          label: "Sisanya adalah $$-16x-7$$.",
        },
        {
          correct: true,
          label: "Jika sisa pembagian itu ditulis $$S(x)$$, maka $$S(0)=9$$.",
        },
        {
          correct: true,
          label: "$$x-1$$ adalah faktor dari $$P(x)$$.",
        },
        {
          correct: false,
          label: "Jumlah semua koefisien hasil baginya adalah $$8$$.",
        },
      ],
    },
  },
};

export default item;
