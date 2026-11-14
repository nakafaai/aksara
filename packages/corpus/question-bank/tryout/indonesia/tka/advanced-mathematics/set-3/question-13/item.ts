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
          correct: true,
          label:
            "Jika $$p=11$$ dan $$q=6$$, titik $$A$$, $$B$$, dan $$C$$ segaris.",
        },
        {
          correct: false,
          label:
            "Jika titik $$A$$, $$B$$, dan $$C$$ segaris, titik $$B$$ adalah titik tengah ruas garis $$AC$$.",
        },
        {
          correct: true,
          label: "Jika $$p=11$$ dan $$q=6$$, berlaku $$AB:BC=1:2$$.",
        },
        {
          correct: true,
          label:
            "Vektor $$\\overrightarrow{AB}$$ tegak lurus vektor $$\\vec{i}-\\vec{j}+\\vec{k}$$.",
        },
        {
          correct: false,
          label: "$$|\\overrightarrow{AB}|=14$$",
        },
      ],
    },
  },
};

export default item;
