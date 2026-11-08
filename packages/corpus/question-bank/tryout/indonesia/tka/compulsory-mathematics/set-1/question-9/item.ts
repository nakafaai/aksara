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
          correct: true,
          label: "Daerah asal $$f$$ adalah semua bilangan real kecuali $$1$$.",
        },
        {
          correct: true,
          label: "Daerah hasil $$f$$ adalah semua bilangan real kecuali $$2$$.",
        },
        {
          correct: false,
          label: "Grafik $$f$$ memotong sumbu $$x$$ di titik $$\\left(\\frac12,0\\right)$$.",
        },
        {
          correct: true,
          label: "Grafik $$f$$ memotong sumbu $$y$$ di titik $$(0,-1)$$.",
        },
        {
          correct: false,
          label: "Untuk $$x>1$$, nilai $$f(x)$$ makin besar ketika $$x$$ makin besar.",
        },
      ],
    },
  },
};

export default item;
