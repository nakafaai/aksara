import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Luas minimum yang mungkin adalah $$78{,}21$$ cm².",
        },
        {
          column: 1,
          label: "Luas maksimum yang mungkin adalah $$81{,}81$$ cm².",
        },
        {
          column: 1,
          label: "Keliling berada di antara $$35{,}6$$ cm dan $$36{,}4$$ cm.",
        },
        {
          column: 2,
          label: "Galat luas absolut terbesar adalah $$1{,}8$$ cm².",
        },
        {
          column: 1,
          label: "Galat luas relatif terbesar melebihi $$2{,}2\\%$$.",
        },
      ],
    },
  },
};

export default item;
