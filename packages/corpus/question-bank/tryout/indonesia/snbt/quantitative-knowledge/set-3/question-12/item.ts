import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Rata-rata data itu pasti lebih dari $$7$$." },
        {
          column: 2,
          label: "Data itu mungkin mempunyai modus tunggal $$15$$.",
        },
        {
          column: 1,
          label:
            "Mungkin hanya ada $$1$$ data yang nilainya lebih dari $$10$$.",
        },
        {
          column: 2,
          label: "Rata-rata data itu mungkin sama dengan $$8{,}5$$.",
        },
      ],
    },
  },
};

export default item;
