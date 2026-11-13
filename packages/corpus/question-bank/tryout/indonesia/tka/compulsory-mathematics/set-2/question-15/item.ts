import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rotasi $$90^\\circ$$ dengan pusat $$(1,0)$$ dilanjutkan rotasi $$90^\\circ$$ dengan pusat $$(0,1)$$",
        },
        {
          correct: true,
          label:
            "Refleksi terhadap garis $$x=3$$, dilanjutkan refleksi terhadap garis $$y=-1$$, lalu dilanjutkan translasi $$\\begin{pmatrix}-6\\\\2\\end{pmatrix}$$",
        },
        {
          correct: true,
          label:
            "Refleksi terhadap garis $$y=2x$$ dilanjutkan refleksi terhadap garis $$x+2y=0$$",
        },
        {
          correct: true,
          label:
            "Rotasi $$90^\\circ$$ dengan pusat $$(1,0)$$ dilanjutkan rotasi $$90^\\circ$$ dengan pusat $$(0,-1)$$",
        },
        {
          correct: true,
          label:
            "Translasi $$\\begin{pmatrix}4\\\\2\\end{pmatrix}$$ dilanjutkan rotasi $$180^\\circ$$ dengan pusat $$(2,1)$$",
        },
      ],
    },
  },
};

export default item;
