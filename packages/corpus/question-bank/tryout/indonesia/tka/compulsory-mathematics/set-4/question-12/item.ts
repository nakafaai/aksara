import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Diagonal $$AC$$ membagi sudut $$BAD$$ menjadi dua sudut yang sama besar.",
        },
        {
          column: 2,
          label:
            "Luas segi empat $$ABCD$$ pasti kurang dari $$100\\text{ cm}^2$$.",
        },
        {
          column: 1,
          label:
            "Jika luas segi empat $$ABCD$$ adalah $$96\\text{ cm}^2$$, maka $$AC+BD=28\\text{ cm}$$.",
        },
      ],
    },
  },
};

export default item;
