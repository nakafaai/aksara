import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "lawn-sprinklers",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Titik tengah sisi $$AB$$ terkena air dari kedua alat penyiram.",
        },
        {
          column: 1,
          label: "Titik potong kedua diagonal halaman tidak terkena air.",
        },
        { column: 2, label: "Titik sudut $$D$$ terkena air." },
        {
          column: 2,
          label:
            "Jika jangkauan kedua alat penyiram diperbesar menjadi 7 m, titik potong kedua diagonal halaman terkena air.",
        },
      ],
    },
  },
};

export default item;
