import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Bilangan $$\\sqrt{9-4\\sqrt{5}}+\\sqrt{5}$$ adalah bilangan rasional.",
        },
        {
          column: 1,
          label:
            "Terdapat tepat satu pasangan bilangan bulat $$(m,n)$$ dengan $$m\\ge2$$ dan $$n\\ge2$$ yang memenuhi $$\\left(2^{m}\\right)^{n}=2^{\\left(m^{n}\\right)}$$.",
        },
        {
          column: 1,
          label:
            "Bilangan $$\\left(\\sqrt{3}+\\sqrt{12}\\right)^{\\frac{2}{3}}$$ adalah bilangan rasional.",
        },
      ],
    },
  },
};

export default item;
