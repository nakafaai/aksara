import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "clinic-queue",
  versions: {
    en: {
      columns: ["Seen that day", "Given a ticket for the next morning"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Number $$44$$ on a Wednesday",
        },
        {
          column: 2,
          label: "Number $$24$$ on a Saturday",
        },
        {
          column: 2,
          label: "Number $$47$$ on a Monday",
        },
        {
          column: 1,
          label: "Number $$23$$ on a Saturday",
        },
        {
          column: 1,
          label: "Number $$45$$ on a Friday",
        },
      ],
    },
  },
};

export default item;
