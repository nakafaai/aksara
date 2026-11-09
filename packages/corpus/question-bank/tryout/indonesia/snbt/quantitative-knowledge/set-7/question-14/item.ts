import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 2, label: "Jari-jari lingkaran itu adalah $$25$$." },
        { column: 1, label: "Titik $$(5,3)$$ terletak pada lingkaran itu." },
        {
          column: 2,
          label: "Titik $$O(0,0)$$ terletak di luar lingkaran itu.",
        },
        { column: 1, label: "Garis $$y=4$$ menyinggung lingkaran itu." },
      ],
    },
  },
};

export default item;
