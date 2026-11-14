import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "$$\\sqrt{\\left(1-\\sqrt3\\right)^2}+\\sqrt[3]{\\left(1-\\sqrt3\\right)^3}=0$$",
        },
        {
          column: 2,
          label:
            "Untuk setiap bilangan real $$a<0$$ dan $$b\\ge0$$, berlaku $$\\sqrt{a^2b}=a\\sqrt b$$.",
        },
        {
          column: 2,
          label:
            "Persamaan $$\\sqrt{x^2+2x+1}=2x-1$$ mempunyai dua penyelesaian real.",
        },
        {
          column: 2,
          label:
            "Untuk setiap bilangan real $$a\\le0$$, berlaku $$\\sqrt{-a}\\cdot\\sqrt{-a}=a$$.",
        },
      ],
    },
  },
};

export default item;
