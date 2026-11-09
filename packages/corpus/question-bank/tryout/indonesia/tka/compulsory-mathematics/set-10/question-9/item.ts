import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Nilai minimum $$f$$ adalah $$-2$$.",
        },
        {
          correct: true,
          label: "$$f(x)=(x-4)\\cdot g(x)$$ untuk setiap bilangan real $$x$$.",
        },
        {
          correct: false,
          label: "$$f(x)\\ge g(x)$$ untuk setiap bilangan real $$x$$.",
        },
        {
          correct: true,
          label:
            "Grafik $$f$$ dan grafik $$g$$ berpotongan di tepat dua titik.",
        },
        {
          correct: true,
          label: "$$f(x)<0$$ tepat untuk $$2<x<4$$.",
        },
      ],
    },
  },
};

export default item;
