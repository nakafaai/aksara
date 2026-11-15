import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "water-rota",
  versions: {
    en: {
      columns: ["Lasts", "Runs short"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "A Block B household of three with one $$1$$-cubic-metre tank",
        },
        {
          column: 2,
          label: "A Block D household of five with one $$1$$-cubic-metre tank",
        },
        {
          column: 1,
          label:
            "A Block A household of six with one tank, after its afternoon turn on the fourth day of the rota",
        },
        {
          column: 2,
          label:
            "A Block A household of six with one tank, after its morning turn on the first day of the rota",
        },
        {
          column: 1,
          label:
            "A Block C household of seven with two $$1$$-cubic-metre tanks",
        },
      ],
    },
  },
};

export default item;
