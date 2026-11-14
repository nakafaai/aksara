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
          label:
            "Daerah asal $$f^{-1}$$ adalah $$\\{x\\mid x\\neq-4,\\ x\\in\\mathbb{R}\\}$$.",
        },
        {
          column: 2,
          label: "$$f^{-1}(1)=\\frac15$$",
        },
        {
          column: 1,
          label: "$$f^{-1}\\left(-\\frac12\\right)=0$$",
        },
        {
          column: 1,
          label: "$$f^{-1}(x)<0$$ untuk setiap $$x>3$$.",
        },
      ],
    },
  },
};

export default item;
