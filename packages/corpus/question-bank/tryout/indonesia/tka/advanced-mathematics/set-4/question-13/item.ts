import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Vektor $$\\vec{u}$$ tegak lurus vektor $$\\vec{v}$$.",
        },
        {
          correct: true,
          label:
            "Sudut antara $$\\vec{u}$$ dan $$\\vec{v}$$ adalah $$60^\\circ$$.",
        },
        {
          correct: false,
          label: "$$\\vec{u}+\\vec{v}=\\vec{w}$$",
        },
        {
          correct: true,
          label: "Titik $$U$$, $$V$$, dan $$W$$ membentuk segitiga sama sisi.",
        },
        {
          correct: true,
          label:
            "Vektor $$\\vec{u}+\\vec{v}+\\vec{w}$$ membentuk sudut yang sama besar dengan $$\\vec{u}$$, dengan $$\\vec{v}$$, dan dengan $$\\vec{w}$$.",
        },
      ],
    },
  },
};

export default item;
