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
          label: "Segitiga $$ABC$$ siku-siku.",
        },
        {
          correct: true,
          label: "Luas segitiga $$ABC$$ adalah $$\\frac72$$ satuan luas.",
        },
        {
          correct: true,
          label: "Ketiga sudut segitiga $$ABC$$ lancip.",
        },
        {
          correct: false,
          label: "$$|\\overrightarrow{AB}|=|\\overrightarrow{AC}|$$",
        },
        {
          correct: true,
          label:
            "Vektor $$6\\vec{i}+3\\vec{j}+2\\vec{k}$$ tegak lurus $$\\overrightarrow{AB}$$ dan juga tegak lurus $$\\overrightarrow{AC}$$.",
        },
      ],
    },
  },
};

export default item;
