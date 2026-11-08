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
          label: "$$f(x)\\ge-2$$ untuk setiap bilangan real $$x$$.",
        },
        {
          correct: true,
          label: "Nilai minimum $$f$$ adalah $$-4$$, dicapai saat $$x=3$$.",
        },
        {
          correct: true,
          label: "$$f(x)=0$$ tepat untuk $$x=1$$ dan $$x=5$$.",
        },
        {
          correct: true,
          label: "$$f(-1)=f(7)$$",
        },
        {
          correct: false,
          label: "Fungsi $$f$$ naik untuk setiap $$x<3$$.",
        },
      ],
    },
  },
};

export default item;
