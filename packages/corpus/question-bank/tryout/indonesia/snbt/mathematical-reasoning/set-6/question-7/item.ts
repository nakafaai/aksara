import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "paper-folding",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Setelah dilipat 5 kali, ketebalan tumpukan adalah 3,2 mm.",
        },
        {
          column: 2,
          label: "Setiap kali dilipat, ketebalan tumpukan bertambah 0,1 mm.",
        },
        {
          column: 2,
          label:
            "Setelah dilipat 7 kali, tumpukan terdiri atas 64 lapisan kertas.",
        },
        {
          column: 1,
          label:
            "Setelah dilipat 20 kali, ketebalan tumpukan lebih dari 100 m.",
        },
      ],
    },
  },
};

export default item;
