import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "stair-design",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tangga dengan $$18$$ anak tangga tidak dapat memakai pijakan selebar $$28\\text{ cm}$$.",
        },
        {
          column: 1,
          label: "Ada rancangan dengan $$19$$ anak tangga yang memenuhi kedua aturan.",
        },
        {
          column: 2,
          label:
            "Tangga dengan $$20$$ anak tangga dan pijakan selebar $$34\\text{ cm}$$ memenuhi kedua aturan.",
        },
        {
          column: 1,
          label:
            "Tangga dengan $$16$$ anak tangga dan pijakan selebar $$28\\text{ cm}$$ memenuhi kedua aturan dan panjang horizontalnya $$420\\text{ cm}$$.",
        },
      ],
    },
  },
};

export default item;
