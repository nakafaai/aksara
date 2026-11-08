import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "daily-temperature",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Rata-ratanya turun $$0{,}5^\\circ\\text{C}$$.",
        },
        {
          column: 2,
          label: "Mediannya berubah.",
        },
        {
          column: 1,
          label: "Jangkauannya menjadi $$4^\\circ\\text{C}$$.",
        },
        {
          column: 2,
          label: "Modusnya berubah menjadi $$30^\\circ\\text{C}$$.",
        },
      ],
    },
  },
};

export default item;
