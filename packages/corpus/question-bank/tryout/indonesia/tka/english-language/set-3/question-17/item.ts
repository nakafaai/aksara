import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "compost-heap",
  versions: {
    en: {
      columns: ["Ready to use", "Turn it now", "Leave it as it is"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Heap A: built $$9$$ weeks ago, centre $$29^\\circ\\text{C}$$ on the last check and $$28^\\circ\\text{C}$$ today, air $$26^\\circ\\text{C}$$, smells of earth.",
        },
        {
          column: 3,
          label:
            "Heap B: built $$10$$ weeks ago, centre $$33^\\circ\\text{C}$$ on the last check and $$31^\\circ\\text{C}$$ today, air $$27^\\circ\\text{C}$$, smells of earth.",
        },
        {
          column: 2,
          label:
            "Heap C: built $$4$$ weeks ago, centre $$47^\\circ\\text{C}$$ on the last check and $$43^\\circ\\text{C}$$ today.",
        },
        {
          column: 3,
          label:
            "Heap D: built $$7$$ weeks ago, centre $$41^\\circ\\text{C}$$ on the last check and $$39^\\circ\\text{C}$$ today.",
        },
        {
          column: 1,
          label:
            "Heap E: built exactly $$8$$ weeks ago, centre $$30^\\circ\\text{C}$$ on the last check and $$29^\\circ\\text{C}$$ today, air $$27^\\circ\\text{C}$$, smells of earth.",
        },
      ],
    },
  },
};

export default item;
