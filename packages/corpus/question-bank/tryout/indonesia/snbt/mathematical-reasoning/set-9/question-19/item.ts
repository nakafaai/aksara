import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "wheelchair-ramp",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kemiringan 1 : 12 sama dengan kemiringan sekitar $$8{,}3\\%$$.",
        },
        {
          column: 2,
          label: "Kemiringan 1 : 10 lebih landai daripada kemiringan 1 : 12.",
        },
        {
          column: 2,
          label:
            "Ruas miring dengan panjang mendatar 6 m dan kemiringan tepat 1 : 12 memiliki panjang permukaan miring lebih dari 6,1 m.",
        },
        {
          column: 1,
          label:
            "Ramp yang terdiri atas dua ruas miring dengan panjang mendatar masing-masing 3,6 m dan satu bordes di antaranya memenuhi kedua aturan.",
        },
      ],
    },
  },
};

export default item;
