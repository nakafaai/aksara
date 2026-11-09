import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "liquid-fertilizer",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Harga per mL pupuk dalam kemasan besar $$12{,}5\\,\\%$$ lebih murah daripada harga per mL dalam kemasan kecil.",
        },
        {
          column: 2,
          label: "Satu kemasan kecil cukup untuk lebih dari $$100$$ liter air.",
        },
        {
          column: 1,
          label:
            "Jika takarannya dinaikkan menjadi $$20$$ mL pupuk untuk setiap $$4$$ liter air, satu kemasan besar cukup untuk $$200$$ liter air.",
        },
        {
          column: 2,
          label:
            "Dengan kemasan kecil, biaya pupuk untuk setiap liter air lebih dari $$\\text{Rp}250$$.",
        },
      ],
    },
  },
};

export default item;
