import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "$$x=3$$ termasuk daerah asal $$f$$." },
        { column: 2, label: "$$x=2{,}5$$ termasuk daerah asal $$f$$." },
        { column: 2, label: "$$x=4$$ termasuk daerah asal $$f$$." },
        {
          column: 1,
          label: "Setiap bilangan real $$x<0$$ termasuk daerah asal $$f$$.",
        },
      ],
    },
  },
};

export default item;
