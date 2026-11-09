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
          label: "Segitiga $$ABC$$ adalah segitiga sama sisi.",
        },
        {
          correct: false,
          label: "$$\\overrightarrow{AB}\\cdot\\overrightarrow{BC}=9$$",
        },
        {
          correct: true,
          label: "Sudut $$BAC$$ adalah sudut siku-siku.",
        },
        {
          correct: true,
          label: "Luas segitiga $$ABC$$ adalah $$\\frac92$$ satuan luas.",
        },
        {
          correct: true,
          label:
            "Titik $$D(3,5,-1)$$ membuat $$ABDC$$ sebuah jajargenjang.",
        },
      ],
    },
  },
};

export default item;
