import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "$$(f\\circ g)(1)=1$$",
        },
        {
          column: 1,
          label: "$$(g\\circ f)(5)=8$$",
        },
        {
          column: 2,
          label:
            "$$(f\\circ g)(x)=(g\\circ f)(x)$$ untuk setiap bilangan real $$x$$.",
        },
        {
          column: 1,
          label:
            "Persamaan $$(g\\circ f)(x)=0$$ memiliki tepat dua penyelesaian.",
        },
      ],
    },
  },
};

export default item;
