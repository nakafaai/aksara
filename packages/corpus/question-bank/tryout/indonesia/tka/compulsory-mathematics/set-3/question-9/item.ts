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
          label: "$$f(1)=0$$",
        },
        {
          correct: false,
          label: "Fungsi $$f$$ turun untuk setiap $$x$$.",
        },
        {
          correct: true,
          label: "Grafik $$f$$ memotong sumbu $$y$$ di titik $$(0,-2)$$.",
        },
        {
          correct: true,
          label: "$$f(x)>-4$$ untuk setiap bilangan real $$x$$.",
        },
        {
          correct: false,
          label: "$$f(3)=2\\cdot f(2)$$",
        },
      ],
    },
  },
};

export default item;
