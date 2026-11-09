import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pada awal pengamatan, banyak pengguna adalah $$1{.}000$$ orang.",
        },
        {
          column: 1,
          label: "Banyak pengguna menjadi dua kali lipat setiap $$3$$ bulan.",
        },
        {
          column: 2,
          label: "$$N(6)=1{.}500$$",
        },
        {
          column: 1,
          label: "Banyak pengguna mencapai $$8{.}000$$ orang pada $$t=12$$.",
        },
      ],
    },
  },
};

export default item;
