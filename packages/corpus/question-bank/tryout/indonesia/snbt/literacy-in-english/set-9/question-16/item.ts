import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "map-projection",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "A country near latitude $$60^\\circ$$ appears with about four times the area of an equally large country on the equator.",
        },
        {
          column: 2,
          label:
            "On Mercator's map, the shortest route between two distant ports is the straight line joining them.",
        },
        {
          column: 1,
          label:
            "A straight line drawn on Mercator's map shows a route that keeps a single compass bearing.",
        },
        {
          column: 2,
          label:
            "Greenland looks as large as Africa because Mercator measured Greenland's size wrongly.",
        },
        {
          column: 1,
          label:
            "A small square island near latitude $$60^\\circ$$ would still look square on Mercator's map.",
        },
      ],
    },
  },
};

export default item;
