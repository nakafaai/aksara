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
          column: 1,
          label: "$$f^{-1}(x)=2+\\sqrt{x+3}$$",
        },
        {
          column: 2,
          label: "Daerah asal $$f^{-1}$$ adalah $$\\{x\\mid x\\ge2\\}$$.",
        },
        {
          column: 1,
          label: "$$f^{-1}(6)=5$$",
        },
        {
          column: 2,
          label: "$$f^{-1}(-3)=0$$",
        },
      ],
    },
  },
};

export default item;
