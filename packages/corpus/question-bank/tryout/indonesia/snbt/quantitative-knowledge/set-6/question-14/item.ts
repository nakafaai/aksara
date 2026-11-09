import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Bilangan terbesarnya adalah $$20$$." },
        { column: 1, label: "Jangkauan keempat bilangan itu adalah $$8$$." },
        {
          column: 2,
          label: "Setelah diurutkan, bilangan ketiganya adalah $$14$$.",
        },
        { column: 2, label: "Jumlah dua bilangan terbesarnya adalah $$30$$." },
      ],
    },
  },
};

export default item;
