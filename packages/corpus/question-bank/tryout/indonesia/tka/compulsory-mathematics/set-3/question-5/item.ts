import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Titik $$(4,2)$$ terletak pada daerah itu, sedangkan titik $$(4,3)$$ tidak.",
        },
        {
          column: 2,
          label: "Banyak titik berkoordinat bilangan bulat pada daerah itu yang memenuhi $$3\\le x\\le5$$ adalah $$10$$.",
        },
        {
          column: 1,
          label: "Di antara titik-titik berkoordinat bilangan bulat pada daerah itu, nilai maksimum $$2x+3y$$ adalah $$15$$.",
        },
      ],
    },
  },
};

export default item;
